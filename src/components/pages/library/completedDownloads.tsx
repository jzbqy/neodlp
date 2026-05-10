import { useEffect } from "react";
import { ProxyImage } from "@/components/custom/proxyImage";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCurrentVideoMetadataStore, useDownloadActionStatesStore, useEnvironmentStore, useLibraryPageStatesStore } from "@/services/store";
import { formatBitrate, formatCodec, formatDurationString, formatFileSize, paginate } from "@/utils";
import { ArrowUpRightIcon, AudioLines, CircleArrowDown, Clock, File, FileAudio2, FileQuestion, FileVideo2, FolderInput, ListVideo, Music, Play, Search, Trash2, Video } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import * as fs from "@tauri-apps/plugin-fs";
import { dirname } from "@tauri-apps/api/path";
import { DownloadState } from "@/types/download";
import { useQueryClient } from "@tanstack/react-query";
import { useDeleteDownloadState } from "@/services/mutations";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useLogger } from "@/helpers/use-logger";
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import PaginationBar from "@/components/custom/paginationBar";
import { useI18n } from "@/i18n/i18nProvider";

interface CompletedDownloadProps {
    state: DownloadState;
}

interface CompletedDownloadsProps {
    downloads: DownloadState[];
}

export function CompletedDownload({ state }: CompletedDownloadProps) {
    const { t } = useI18n();
    const downloadActions = useDownloadActionStatesStore(state => state.downloadActions);
    const setIsDeleteFileChecked = useDownloadActionStatesStore(state => state.setIsDeleteFileChecked);

    const isFlatpak = useEnvironmentStore(state => state.isFlatpak);

    const queryClient = useQueryClient();
    const downloadStateDeleter = useDeleteDownloadState();
    const navigate = useNavigate();
    const LOG = useLogger();

    const openFile = async (filePath: string | null, app: string | null) => {
        if (filePath && await fs.exists(filePath)) {
            try {
                await invoke('open_file_with_app', { filePath: filePath, appName: app }).then(() => {
                    const isReveal = app === 'explorer';
                    const appName = app ? app : 'default app';
                    toast.info(isReveal ? t.revealingFile : t.openingFile, {
                        description: isReveal ? t.revealingFileDesc.replace('{app}', appName) : t.openingFileDesc.replace('{app}', appName),
                    })
                });
            } catch (e) {
                console.error(e);
                const isReveal = app === 'explorer';
                toast.error(isReveal ? t.failedToRevealFile : t.failedToOpenFile, {
                    description: isReveal ? t.failedToRevealFileDesc : t.failedToOpenFileDesc,
                })
            }
        } else {
            const isReveal = app === 'explorer';
            const action = isReveal ? 'reveal' : 'open';
            toast.info(t.fileUnavailable, {
                description: t.fileUnavailableDesc.replace('{action}', action),
            })
        }
    }

    const removeFromDownloads = async (downloadState: DownloadState, delete_file: boolean) => {
        const isMultiplePlaylistItems = downloadState.playlist_id !== null &&
            downloadState.playlist_indices !== null &&
            downloadState.playlist_indices.includes(',');

        if (delete_file && downloadState.filepath) {
            if (isMultiplePlaylistItems) {
                const dirPath = await dirname(downloadState.filepath);
                try {
                    if (await fs.exists(dirPath)) {
                        await fs.remove(dirPath, { recursive: true });
                    } else {
                        console.error(`Directory not found: "${dirPath}"`);
                    }
                } catch (e) {
                    console.error(e);
                }
            } else {
                try {
                    if (await fs.exists(downloadState.filepath)) {
                        await fs.remove(downloadState.filepath);
                    } else {
                        console.error(`File not found: "${downloadState.filepath}"`);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        }

        const prefix = isMultiplePlaylistItems ? 'playlist ' : '';
        const title = isMultiplePlaylistItems ? downloadState.playlist_title : downloadState.title;

        downloadStateDeleter.mutate(downloadState.download_id, {
            onSuccess: (data) => {
                console.log("Download State deleted successfully:", data);
                queryClient.invalidateQueries({ queryKey: ['download-states'] });
                if (delete_file  && downloadState.filepath) {
                    toast.success(t.deletedFromDownloads, {
                        description: t.deletedFromDownloadsDesc.replace('{prefix}', prefix).replace('{title}', title),
                    });
                } else {
                    toast.success(t.removedFromDownloads, {
                        description: t.removedFromDownloadsDesc.replace('{prefix}', prefix).replace('{title}', title),
                    });
                }
            },
            onError: (error) => {
                console.error("Failed to delete download state:", error);
                if (delete_file  && downloadState.filepath) {
                    toast.error(t.failedToDeleteDownload, {
                        description: t.failedToDeleteDownloadDesc.replace('{prefix}', prefix).replace('{title}', title),
                    });
                } else {
                    toast.error(t.failedToRemoveDownload, {
                        description: t.failedToRemoveDownloadDesc.replace('{prefix}', prefix).replace('{title}', title),
                    });
                }
            }
        })
    }

    const handleSearch = async (url: string, isPlaylist: boolean) => {
        try {
            LOG.info('NEODLP', `Received search request from library for URL: ${url}`);
            navigate('/');
            const { setRequestedUrl, setAutoSubmitSearch } = useCurrentVideoMetadataStore.getState();
            setRequestedUrl(url);
            setAutoSubmitSearch(true);
            toast.info(isPlaylist ? t.initiatingPlaylistSearch : t.initiatingVideoSearch, {
                description: t.initiatingSearchDesc.replace('{type}', isPlaylist ? t.playlist : t.video),
            });
        } catch (e) {
            console.error(e);
            toast.error(t.failedToInitiateSearch, {
                description: t.failedToInitiateSearchDesc,
            });
        }
    }

    const itemActionStates = downloadActions[state.download_id] || {
        isResuming: false,
        isPausing: false,
        isCanceling: false,
        isDeleteFileChecked: false,
    };

    const isPlaylist = state.playlist_id !== null && state.playlist_indices !== null;
    const isMultiplePlaylistItems = isPlaylist && state.playlist_indices && state.playlist_indices.includes(',');
    const isMultipleAudioFormatSelected = state.format_id ? state.format_id.split('+').length > 2 : false;

    return (
        <div className="p-4 border border-border rounded-lg flex gap-4" key={state.download_id}>
            <div className="w-[30%] flex flex-col justify-between gap-2">
                {isMultiplePlaylistItems ? (
                    <div className="w-full relative flex items-center justify-center mt-2">
                        <AspectRatio ratio={16 / 9} className="w-full rounded-lg overflow-hidden border border-border mb-2 z-20">
                            <ProxyImage src={state.thumbnail || ""} alt="thumbnail" className="" />
                        </AspectRatio>
                        <div className="w-[95%] aspect-video absolute -top-1 rounded-lg overflow-hidden border border-border mb-2 z-10">
                            <ProxyImage src={state.thumbnail || ""} alt="thumbnail" className="blur-xs brightness-75" />
                        </div>
                        <div className="w-[87%] aspect-video absolute -top-2 rounded-lg overflow-hidden border border-border mb-2 z-0">
                            <ProxyImage src={state.thumbnail || ""} alt="thumbnail" className="blur-sm brightness-50" />
                        </div>
                    </div>
                ) : (
                    <AspectRatio ratio={16 / 9} className="w-full rounded-lg overflow-hidden border border-border mb-2">
                        <ProxyImage src={state.thumbnail || ""} alt="thumbnail" className="" />
                    </AspectRatio>
                )}
                {isMultiplePlaylistItems ? (
                    <span className="w-full flex items-center justify-center text-xs border border-border py-1 px-2 rounded">
                        <ListVideo className="w-4 h-4 mr-2 stroke-primary" /> {t.playlist} ({state.playlist_indices?.split(',').length})
                    </span>
                ) : (
                    <span className="w-full flex items-center justify-center text-xs border border-border py-1 px-2 rounded">
                        {state.filetype && (state.filetype === 'video' || state.filetype === 'video+audio') && (
                            <Video className="w-4 h-4 mr-2 stroke-primary" />
                        )}
                        {state.filetype && state.filetype === 'audio' && (
                            <Music className="w-4 h-4 mr-2 stroke-primary" />
                        )}
                        {(!state.filetype) || (state.filetype && state.filetype !== 'video' && state.filetype !== 'audio' && state.filetype !== 'video+audio') && (
                            <File className="w-4 h-4 mr-2 stroke-primary" />
                        )}
                        {state.ext ? state.ext.toUpperCase() : t.unknown} {state.resolution ? `(${state.resolution})` : null}
                    </span>
                )}
            </div>
            <div className="w-full flex flex-col justify-between gap-2">
                <div className="flex flex-col gap-1">
                    <h4 className="">{isMultiplePlaylistItems ? state.playlist_title : state.title}</h4>
                    <p className="text-xs text-muted-foreground">{isMultiplePlaylistItems ? state.playlist_channel ?? t.unknown : state.channel ?? t.unknown} {state.host ? <><span className="text-primary">•</span> {state.host}</> : t.unknown}</p>
                    <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground flex items-center pr-3">
                            {isMultiplePlaylistItems ? (
                                <><ListVideo className="w-4 h-4 mr-2"/> {state.playlist_n_entries ?? t.unknown}</>
                            ) : (
                                <><Clock className="w-4 h-4 mr-2"/> {state.duration_string ? formatDurationString(state.duration_string) : t.unknown}</>
                            )}
                        </span>
                        <Separator orientation="vertical" />
                        <span className="text-xs text-muted-foreground flex items-center px-3">
                        {state.filetype && (state.filetype === 'video' || state.filetype === 'video+audio') && (
                            <FileVideo2 className="w-4 h-4 mr-2"/>
                        )}
                        {state.filetype && state.filetype === 'audio' && (
                            <FileAudio2 className="w-4 h-4 mr-2" />
                        )}
                        {(!state.filetype) || (state.filetype && state.filetype !== 'video' && state.filetype !== 'audio' && state.filetype !== 'video+audio') && (
                            <FileQuestion className="w-4 h-4 mr-2" />
                        )}
                        {state.filesize ? formatFileSize(state.filesize) : t.unknown}
                        </span>
                        <Separator orientation="vertical" />
                        <span className="text-xs text-muted-foreground flex items-center pl-3"><AudioLines className="w-4 h-4 mr-2"/>
                        {state.vbr && state.abr ? (
                            formatBitrate(state.vbr + state.abr)
                        ) : state.vbr ? (
                            formatBitrate(state.vbr)
                        ) : state.abr ? (
                            formatBitrate(state.abr)
                        ) : (
                            t.unknown
                        )}
                        </span>
                    </div>
                    <div className="hidden xl:flex items-center mt-1 gap-2 flex-wrap text-xs">
                        {state.playlist_id && state.playlist_indices && !isMultiplePlaylistItems && (
                            <span
                            className="border border-border py-1 px-2 rounded flex items-center cursor-pointer"
                            title={`${state.playlist_title ?? t.unknownPlaylist}` + ' by ' + `${state.playlist_channel ?? t.unknownChannel}`}
                            >
                                <ListVideo className="w-4 h-4 mr-2" /> {t.playlist} ({state.playlist_indices} of {state.playlist_n_entries})
                            </span>
                        )}
                        {state.vcodec && !isMultiplePlaylistItems && (
                            <span className="border border-border py-1 px-2 rounded">{formatCodec(state.vcodec)}</span>
                        )}
                        {state.acodec && !isMultiplePlaylistItems && (
                            <span className="border border-border py-1 px-2 rounded">{formatCodec(state.acodec)}</span>
                        )}
                        {isMultipleAudioFormatSelected && (
                            <span className="border border-border py-1 px-2 rounded">{t.multiaudio}</span>
                        )}
                        {state.dynamic_range && state.dynamic_range !== 'SDR' && !isMultiplePlaylistItems && (
                            <span className="border border-border py-1 px-2 rounded">{state.dynamic_range}</span>
                        )}
                        {state.subtitle_id && (
                            <span
                            className="border border-border py-1 px-2 rounded cursor-pointer"
                            title={t.embeddedSubtitle.replace('{id}', state.subtitle_id)}
                            >
                                ESUB
                            </span>
                        )}
                        {state.sponsorblock_mark && (
                            <span
                            className="border border-border py-1 px-2 rounded cursor-pointer"
                            title={t.sponsorblockMarked.replace('{type}', state.sponsorblock_mark)}
                            >
                                SPBLOCK(M)
                            </span>
                        )}
                        {state.sponsorblock_remove && (
                            <span
                            className="border border-border py-1 px-2 rounded cursor-pointer"
                            title={t.sponsorblockRemoved.replace('{type}', state.sponsorblock_remove)}
                            >
                                SPBLOCK(R)
                            </span>
                        )}
                    </div>
                </div>
                <div className="w-full flex items-center gap-2">
                    <Button size="sm" onClick={() => openFile(state.filepath, null)}>
                        <Play className="w-4 h-4" />
                        {t.open}
                    </Button>
                    {!isFlatpak && (
                        <Button size="sm" variant="outline" onClick={() => openFile(state.filepath, 'explorer')}>
                            <FolderInput className="w-4 h-4" />
                            {t.reveal}
                        </Button>
                    )}
                    <Button size="sm" variant="outline" onClick={() => handleSearch(state.url, state.playlist_id ? true : false)}>
                        <Search className="w-4 h-4" />
                        {t.search}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4" />
                                {t.remove}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t.removeFromLibrary}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t.removeFromLibraryDesc}
                                </AlertDialogDescription>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="delete-file" checked={itemActionStates.isDeleteFileChecked} onCheckedChange={() => {setIsDeleteFileChecked(state.download_id, !itemActionStates.isDeleteFileChecked)}} />
                                    <Label htmlFor="delete-file">{t.deleteDownloadedFile}</Label>
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                                <AlertDialogAction onClick={
                                    () => removeFromDownloads(state, itemActionStates.isDeleteFileChecked).then(() => {
                                        setIsDeleteFileChecked(state.download_id, false);
                                    })
                                }>{t.remove}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
}

export function CompletedDownloads({ downloads }: CompletedDownloadsProps) {
    const { t } = useI18n();
    const activeCompletedDownloadsPage = useLibraryPageStatesStore(state => state.activeCompletedDownloadsPage);
    const setActiveCompletedDownloadsPage = useLibraryPageStatesStore(state => state.setActiveCompletedDownloadsPage);

    const navigate = useNavigate();
    const paginatedCompletedDownloads = paginate(downloads, activeCompletedDownloadsPage, 5);

    // Ensure current page is valid when downloads change
    useEffect(() => {
        if (downloads.length > 0 && activeCompletedDownloadsPage > paginatedCompletedDownloads.last_page) {
            setActiveCompletedDownloadsPage(paginatedCompletedDownloads.last_page);
        }
    }, [downloads.length, activeCompletedDownloadsPage, paginatedCompletedDownloads.last_page, setActiveCompletedDownloadsPage]);

    return (
        <div className="w-full flex flex-col gap-2">
            {paginatedCompletedDownloads.data.length > 0 ? (
                <>
                {paginatedCompletedDownloads.data.map((state) => {
                    return (
                        <CompletedDownload key={state.download_id} state={state} />
                    );
                })}
                {paginatedCompletedDownloads.pages.length > 1 && (
                    <PaginationBar
                        paginatedData={paginatedCompletedDownloads}
                        setPage={setActiveCompletedDownloadsPage}
                    />
                )}
                </>
            ) : (
                <Empty className="mt-10">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <CircleArrowDown className="stroke-primary" />
                        </EmptyMedia>
                        <EmptyTitle>{t.noCompletedDownloads}</EmptyTitle>
                        <EmptyDescription>
                        {t.noCompletedDownloadsDesc}
                        </EmptyDescription>
                    </EmptyHeader>
                    <Button
                        variant="link"
                        className="text-muted-foreground"
                        size="sm"
                        onClick={() => navigate("/")}
                    >
                        {t.spinUpNewDownload}  <ArrowUpRightIcon />
                    </Button>
                </Empty>
            )}
        </div>
    );
}
