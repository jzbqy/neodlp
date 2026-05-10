import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppContext } from "@/providers/appContextProvider";
import { useDownloaderPageStatesStore, useSettingsPageStatesStore } from "@/services/store";
import { formatBitrate, formatFileSize } from "@/utils";
import { Loader2, Music, Video, File, AlertCircleIcon, Settings2 } from "lucide-react";
import { useEffect, useRef } from "react";
import { RawVideoInfo, VideoFormat } from "@/types/video";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useI18n } from "@/i18n/i18nProvider";

interface DownloadConfigDialogProps {
    selectedFormatFileType: "video+audio" | "video" | "audio" | "unknown";
}

interface BottomBarProps {
    videoMetadata: RawVideoInfo;
    selectedFormat: VideoFormat | undefined;
    selectedFormatFileType: "video+audio" | "video" | "audio" | "unknown";
    selectedVideoFormat: VideoFormat | undefined;
    selectedAudioFormats: VideoFormat[] | undefined;
    containerRef: React.RefObject<HTMLDivElement | null>;
}

function DownloadConfigDialog({ selectedFormatFileType }: DownloadConfigDialogProps) {
    const { t } = useI18n();
    const activeDownloadModeTab = useDownloaderPageStatesStore((state) => state.activeDownloadModeTab);
    const activeDownloadConfigurationTab = useDownloaderPageStatesStore((state) => state.activeDownloadConfigurationTab);
    const selectedDownloadFormat = useDownloaderPageStatesStore((state) => state.selectedDownloadFormat);
    const selectedCombinableVideoFormat = useDownloaderPageStatesStore((state) => state.selectedCombinableVideoFormat);
    const selectedCombinableAudioFormats = useDownloaderPageStatesStore((state) => state.selectedCombinableAudioFormats);
    const downloadConfiguration = useDownloaderPageStatesStore((state) => state.downloadConfiguration);
    const setActiveDownloadConfigurationTab = useDownloaderPageStatesStore((state) => state.setActiveDownloadConfigurationTab);
    const setDownloadConfigurationKey = useDownloaderPageStatesStore((state) => state.setDownloadConfigurationKey);

    const embedVideoMetadata = useSettingsPageStatesStore(state => state.settings.embed_video_metadata);
    const embedAudioMetadata = useSettingsPageStatesStore(state => state.settings.embed_audio_metadata);
    const embedVideoThumbnail = useSettingsPageStatesStore(state => state.settings.embed_video_thumbnail);
    const embedAudioThumbnail = useSettingsPageStatesStore(state => state.settings.embed_audio_thumbnail);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);
    const customCommands = useSettingsPageStatesStore(state => state.settings.custom_commands);

    const isCombineableAudioSelected = selectedCombinableAudioFormats && selectedCombinableAudioFormats.length > 0;

    return (
        <Dialog>
            <Tooltip>
                <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                        <Button
                        variant="outline"
                        size="icon"
                        disabled={!selectedDownloadFormat || (activeDownloadModeTab === 'combine' && (!selectedCombinableVideoFormat || !isCombineableAudioSelected))}
                        >
                            <Settings2 className="size-4" />
                        </Button>
                    </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                <p>{t.configurations}</p>
                </TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-112.5">
                <DialogHeader>
                    <DialogTitle>{t.configurations}</DialogTitle>
                    <DialogDescription>{t.tweakDownloadConfigurations}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 max-h-75 overflow-y-scroll overflow-x-hidden no-scrollbar">
                    <Tabs
                    className=""
                    value={activeDownloadConfigurationTab}
                    onValueChange={(tab) => setActiveDownloadConfigurationTab(tab)}
                    >
                        <TabsList>
                            <TabsTrigger value="options">{t.options}</TabsTrigger>
                            <TabsTrigger value="commands">{t.commands}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="options">
                            {useCustomCommands ? (
                            <Alert className="mt-2 mb-3">
                                <AlertCircleIcon className="size-4 stroke-primary" />
                                <AlertTitle className="text-sm">{t.optionsUnavailable}</AlertTitle>
                                <AlertDescription className="text-xs">
                                    {t.optionsUnavailableDesc}
                                </AlertDescription>
                            </Alert>
                            ) : null}
                            <div className="video-format">
                                <Label className="text-xs mb-3 mt-2">{t.outputFormat} ({(selectedFormatFileType && (selectedFormatFileType === 'video' || selectedFormatFileType === 'video+audio')) || activeDownloadModeTab === 'combine' ? t.video : selectedFormatFileType && selectedFormatFileType === 'audio' ? t.audio : t.unknown})</Label>
                                {(selectedFormatFileType && (selectedFormatFileType === 'video' || selectedFormatFileType === 'video+audio')) || activeDownloadModeTab === 'combine' ? (
                                    <RadioGroup
                                    orientation="horizontal"
                                    className="flex items-center gap-4 flex-wrap my-2"
                                    value={downloadConfiguration.output_format ?? 'auto'}
                                    onValueChange={(value) => setDownloadConfigurationKey('output_format', value)}
                                    disabled={useCustomCommands}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="auto" id="v-auto" />
                                            <Label htmlFor="v-auto">{t.followSettings}</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="mp4" id="v-mp4" />
                                            <Label htmlFor="v-mp4">MP4</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="webm" id="v-webm" />
                                            <Label htmlFor="v-webm">WEBM</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="mkv" id="v-mkv" />
                                            <Label htmlFor="v-mkv">MKV</Label>
                                        </div>
                                    </RadioGroup>
                                ) : selectedFormatFileType && selectedFormatFileType === 'audio' ? (
                                    <RadioGroup
                                    orientation="horizontal"
                                    className="flex items-center gap-4 flex-wrap my-2"
                                    value={downloadConfiguration.output_format ?? 'auto'}
                                    onValueChange={(value) => setDownloadConfigurationKey('output_format', value)}
                                    disabled={useCustomCommands}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="auto" id="a-auto" />
                                            <Label htmlFor="a-auto">{t.followSettings}</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="m4a" id="a-m4a" />
                                            <Label htmlFor="a-m4a">M4A</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="opus" id="a-opus" />
                                            <Label htmlFor="a-opus">OPUS</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="mp3" id="a-mp3" />
                                            <Label htmlFor="a-mp3">MP3</Label>
                                        </div>
                                    </RadioGroup>
                                ) : (
                                    <RadioGroup
                                    orientation="horizontal"
                                    className="flex items-center gap-4 flex-wrap my-2"
                                    value={downloadConfiguration.output_format ?? 'auto'}
                                    onValueChange={(value) => setDownloadConfigurationKey('output_format', value)}
                                    disabled={useCustomCommands}
                                    >
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="auto" id="u-auto" />
                                            <Label htmlFor="u-auto">Follow Settings</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="mp4" id="u-mp4" />
                                            <Label htmlFor="u-mp4">MP4</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="webm" id="u-webm" />
                                            <Label htmlFor="u-webm">WEBM</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="mkv" id="u-mkv" />
                                            <Label htmlFor="u-mkv">MKV</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="m4a" id="u-m4a" />
                                            <Label htmlFor="u-m4a">M4A</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="opus" id="u-opus" />
                                            <Label htmlFor="u-opus">OPUS</Label>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <RadioGroupItem value="mp3" id="u-mp3" />
                                            <Label htmlFor="u-mp3">MP3</Label>
                                        </div>
                                    </RadioGroup>
                                )}
                            </div>
                            <div className="sponsorblock">
                                <Label className="text-xs my-3">Sponsorblock Mode</Label>
                                <RadioGroup
                                orientation="horizontal"
                                className="flex items-center gap-4 flex-wrap my-2"
                                value={downloadConfiguration.sponsorblock ?? 'auto'}
                                onValueChange={(value) => setDownloadConfigurationKey('sponsorblock', value)}
                                disabled={useCustomCommands}
                                >
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="auto" id="sb-auto" />
                                        <Label htmlFor="sb-auto">Follow Settings</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="remove" id="sb-remove" />
                                        <Label htmlFor="sb-remove">Remove</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="mark" id="sb-mark" />
                                        <Label htmlFor="sb-mark">Mark</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="embeding-options">
                                <Label className="text-xs my-3">Embedding Options</Label>
                                <div className="flex items-center space-x-2 mt-3">
                                    <Switch
                                    id="embed-metadata"
                                    checked={downloadConfiguration.embed_metadata !== null ? downloadConfiguration.embed_metadata : (selectedFormatFileType && (selectedFormatFileType === 'video' || selectedFormatFileType === 'video+audio')) || activeDownloadModeTab === 'combine' ? embedVideoMetadata : selectedFormatFileType && selectedFormatFileType === 'audio' ? embedAudioMetadata : false}
                                    onCheckedChange={(checked) => setDownloadConfigurationKey('embed_metadata', checked)}
                                    disabled={useCustomCommands}
                                    />
                                    <Label htmlFor="embed-metadata">Embed Metadata</Label>
                                </div>
                                <div className="flex items-center space-x-2 mt-3">
                                    <Switch
                                    id="embed-thumbnail"
                                    checked={downloadConfiguration.embed_thumbnail !== null ? downloadConfiguration.embed_thumbnail : (selectedFormatFileType && (selectedFormatFileType === 'video' || selectedFormatFileType === 'video+audio')) || activeDownloadModeTab === 'combine' ? embedVideoThumbnail : selectedFormatFileType && selectedFormatFileType === 'audio' ? embedAudioThumbnail : false}
                                    onCheckedChange={(checked) => setDownloadConfigurationKey('embed_thumbnail', checked)}
                                    disabled={useCustomCommands}
                                    />
                                    <Label htmlFor="embed-thumbnail">Embed Thumbnail</Label>
                                    <div className="flex items-center gap-3 ml-4">
                                        <Checkbox
                                        id="square-crop-thumbnail"
                                        checked={downloadConfiguration.square_crop_thumbnail !== null ? downloadConfiguration.square_crop_thumbnail : false}
                                        onCheckedChange={(checked) => setDownloadConfigurationKey('square_crop_thumbnail', checked)}
                                        disabled={useCustomCommands || !(downloadConfiguration.embed_thumbnail !== null ? downloadConfiguration.embed_thumbnail : (selectedFormatFileType && (selectedFormatFileType === 'video' || selectedFormatFileType === 'video+audio')) || activeDownloadModeTab === 'combine' ? embedVideoThumbnail : selectedFormatFileType && selectedFormatFileType === 'audio' ? embedAudioThumbnail : false)}
                                        />
                                        <Label htmlFor="square-crop-thumbnail">Square Crop</Label>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="commands">
                            {!useCustomCommands ? (
                            <Alert className="mt-2 mb-3">
                                <AlertCircleIcon className="size-4 stroke-primary" />
                                <AlertTitle className="text-sm">Enable Custom Commands!</AlertTitle>
                                <AlertDescription className="text-xs">
                                    To run custom commands for downloads, please enable it from the Settings.
                                </AlertDescription>
                            </Alert>
                            ) : null}
                            <div className="custom-commands">
                                <Label className="text-xs mb-3 mt-2">Run Custom Command</Label>
                                {customCommands.length === 0 ? (
                                    <p className="text-sm text-muted-foreground">NO CUSTOM COMMAND TEMPLATE ADDED YET!</p>
                                ) : (
                                    <RadioGroup
                                    orientation="vertical"
                                    className="flex flex-col gap-2 my-2"
                                    disabled={!useCustomCommands}
                                    value={downloadConfiguration.custom_command}
                                    onValueChange={(value) => setDownloadConfigurationKey('custom_command', value)}
                                    >
                                        {customCommands.map((command) => (
                                            <div className="flex items-center gap-3" key={command.id}>
                                                <RadioGroupItem value={command.id} id={`cmd-${command.id}`} />
                                                <Label htmlFor={`cmd-${command.id}`}>{command.label}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function BottomBar({ videoMetadata, selectedFormat, selectedFormatFileType, selectedVideoFormat, selectedAudioFormats, containerRef }: BottomBarProps) {
    const { t } = useI18n();
    const { startDownload } = useAppContext();

    const activeDownloadModeTab = useDownloaderPageStatesStore((state) => state.activeDownloadModeTab);
    const isStartingDownload = useDownloaderPageStatesStore((state) => state.isStartingDownload);
    const selectedDownloadFormat = useDownloaderPageStatesStore((state) => state.selectedDownloadFormat);
    const selectedCombinableVideoFormat = useDownloaderPageStatesStore((state) => state.selectedCombinableVideoFormat);
    const selectedCombinableAudioFormats = useDownloaderPageStatesStore((state) => state.selectedCombinableAudioFormats);
    const selectedSubtitles = useDownloaderPageStatesStore((state) => state.selectedSubtitles);
    const selectedPlaylistVideos = useDownloaderPageStatesStore((state) => state.selectedPlaylistVideos);
    const downloadConfiguration = useDownloaderPageStatesStore((state) => state.downloadConfiguration);
    const setActiveDownloadConfigurationTab = useDownloaderPageStatesStore((state) => state.setActiveDownloadConfigurationTab);
    const setIsStartingDownload = useDownloaderPageStatesStore((state) => state.setIsStartingDownload);

    const videoFormat = useSettingsPageStatesStore(state => state.settings.video_format);
    const audioFormat = useSettingsPageStatesStore(state => state.settings.audio_format);
    const useSponsorblock = useSettingsPageStatesStore(state => state.settings.use_sponsorblock);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    const bottomBarRef = useRef<HTMLDivElement>(null);

    const isPlaylist = videoMetadata._type === 'playlist';
    const isMultiplePlaylistItems = isPlaylist && selectedPlaylistVideos.length > 1;
    const isCombineableAudioSelected = selectedCombinableAudioFormats && selectedCombinableAudioFormats.length > 0 && selectedAudioFormats && selectedAudioFormats.length > 0;
    const isMultipleCombineableAudioSelected = selectedCombinableAudioFormats && selectedCombinableAudioFormats.length > 1 && selectedAudioFormats && selectedAudioFormats.length > 1;

    let selectedFormatExtensionMsg = `${t.statusAuto} - ${t.statusUnknown}`;
    if (activeDownloadModeTab === 'combine') {
        if (downloadConfiguration.output_format && downloadConfiguration.output_format !== 'auto') {
            selectedFormatExtensionMsg = `${t.statusCombined} - ${downloadConfiguration.output_format.toUpperCase()}`;
        } else if (videoFormat !== 'auto') {
            selectedFormatExtensionMsg = `${t.statusCombined} - ${videoFormat.toUpperCase()}`;
        } else if (isCombineableAudioSelected && selectedVideoFormat?.ext) {
            if (isMultipleCombineableAudioSelected) {
                selectedFormatExtensionMsg = `${t.statusCombined} - ${selectedVideoFormat.ext.toUpperCase()} + ${selectedAudioFormats.length} ${t.audio}`;
            } else {
                selectedFormatExtensionMsg = `${t.statusCombined} - ${selectedVideoFormat.ext.toUpperCase()} + ${selectedAudioFormats[0].ext.toUpperCase()}`;
            }
        } else {
            selectedFormatExtensionMsg = `${t.statusCombined} - ${t.statusUnknown}`;
        }
    } else if (selectedFormat?.ext) {
        if ((selectedFormatFileType === 'video+audio' || selectedFormatFileType === 'video') && ((downloadConfiguration.output_format && downloadConfiguration.output_format !== 'auto') || videoFormat !== 'auto')) {
            selectedFormatExtensionMsg = `${t.statusForced} - ${(downloadConfiguration.output_format && downloadConfiguration.output_format !== 'auto') ? downloadConfiguration.output_format.toUpperCase() : videoFormat.toUpperCase()}`;
        } else if (selectedFormatFileType === 'audio' && ((downloadConfiguration.output_format && downloadConfiguration.output_format !== 'auto') || audioFormat !== 'auto')) {
            selectedFormatExtensionMsg = `${t.statusForced} - ${(downloadConfiguration.output_format && downloadConfiguration.output_format !== 'auto') ? downloadConfiguration.output_format.toUpperCase() : audioFormat.toUpperCase()}`;
        } else if (selectedFormatFileType === 'unknown' && downloadConfiguration.output_format && downloadConfiguration.output_format !== 'auto') {
            selectedFormatExtensionMsg = `${t.statusForced} - ${downloadConfiguration.output_format.toUpperCase()}`;
        } else {
            selectedFormatExtensionMsg = `${t.statusAuto} - ${selectedFormat.ext.toUpperCase()}`;
        }
    }

    let selectedFormatResolutionMsg = t.statusUnknown;
    let totalTbr = 0;
    if (activeDownloadModeTab === 'combine') {
        if (isCombineableAudioSelected) {
            if (isMultipleCombineableAudioSelected) {
                const totalAudioTbr = selectedAudioFormats.reduce((acc, format) => acc + (format.tbr ?? 0), 0);
                totalTbr = (selectedVideoFormat?.tbr ?? 0) + totalAudioTbr;
                selectedFormatResolutionMsg = `${selectedVideoFormat?.resolution ?? t.statusUnknown} + ${formatBitrate(totalAudioTbr)}`;
            } else {
                totalTbr = (selectedVideoFormat?.tbr ?? 0) + (selectedAudioFormats && selectedAudioFormats[0].tbr ? selectedAudioFormats[0].tbr : 0);
                selectedFormatResolutionMsg = `${selectedVideoFormat?.resolution ?? t.statusUnknown} + ${selectedAudioFormats && selectedAudioFormats[0].tbr ? formatBitrate(selectedAudioFormats[0].tbr) : t.statusUnknown}`;
            }
        } else {
            totalTbr = selectedVideoFormat?.tbr ?? 0;
            selectedFormatResolutionMsg = `${selectedVideoFormat?.resolution ?? t.statusUnknown} + ${t.statusUnknown}`;
        }
    } else if (selectedFormat?.resolution) {
        totalTbr = selectedFormat.tbr ?? 0;
        selectedFormatResolutionMsg = selectedFormat.resolution;
    }

    let selectedFormatDynamicRangeMsg = '';
    if (activeDownloadModeTab === 'combine') {
        selectedFormatDynamicRangeMsg = selectedVideoFormat?.dynamic_range && selectedVideoFormat.dynamic_range !== 'SDR' && selectedVideoFormat.dynamic_range !== 'auto' ? selectedVideoFormat.dynamic_range : '';
    } else if (selectedFormat?.dynamic_range && selectedFormat.dynamic_range !== 'SDR' && selectedFormat.dynamic_range !== 'auto') {
        selectedFormatDynamicRangeMsg = selectedFormat.dynamic_range;
    }

    let selectedFormatFileSizeMsg = 'unknown filesize';
    let totalFilesize = 0;
    if (activeDownloadModeTab === 'combine') {
        if (isCombineableAudioSelected) {
            if (isMultipleCombineableAudioSelected) {
                totalFilesize = (selectedVideoFormat?.filesize_approx ?? 0) + selectedAudioFormats.reduce((acc, format) => acc + (format.filesize_approx ?? 0), 0);
                selectedFormatFileSizeMsg = totalFilesize > 0 ? formatFileSize(totalFilesize) : 'unknown filesize';
            } else {
                totalFilesize = (selectedVideoFormat?.filesize_approx ?? 0) + (selectedAudioFormats && selectedAudioFormats[0].filesize_approx ? selectedAudioFormats[0].filesize_approx : 0);
                selectedFormatFileSizeMsg = (selectedVideoFormat?.filesize_approx && selectedAudioFormats && selectedAudioFormats[0].filesize_approx) ? formatFileSize(selectedVideoFormat.filesize_approx + selectedAudioFormats[0].filesize_approx) : 'unknown filesize';
            }
        } else {
            totalFilesize = selectedVideoFormat?.filesize_approx ?? 0;
            selectedFormatFileSizeMsg = selectedVideoFormat?.filesize_approx ? formatFileSize(selectedVideoFormat.filesize_approx) : 'unknown filesize';
        }
    } else if (selectedFormat?.filesize_approx) {
        totalFilesize = selectedFormat.filesize_approx;
        selectedFormatFileSizeMsg = formatFileSize(selectedFormat.filesize_approx);
    }

    let selectedFormatFinalMsg = '';
    if (activeDownloadModeTab === 'combine') {
        if (selectedCombinableVideoFormat && selectedCombinableAudioFormats.length > 0) {
            selectedFormatFinalMsg = `${selectedFormatExtensionMsg} (${selectedFormatResolutionMsg}) ${selectedFormatDynamicRangeMsg} ${selectedSubtitles.length > 0 ? `• ESUB` : ''} ${useSponsorblock || (downloadConfiguration.sponsorblock && downloadConfiguration.sponsorblock !== 'auto') ? `• SPBLOCK` : ''} • ${selectedFormatFileSizeMsg}`;
        } else {
            selectedFormatFinalMsg = `Choose a video and audio streams to combine`;
        }
    } else {
        if (selectedFormat) {
            selectedFormatFinalMsg = `${selectedFormatExtensionMsg} (${selectedFormatResolutionMsg}) ${selectedFormatDynamicRangeMsg} ${selectedSubtitles.length > 0 ? `• ESUB` : ''} ${useSponsorblock || (downloadConfiguration.sponsorblock && downloadConfiguration.sponsorblock !== 'auto') ? `• SPBLOCK` : ''} • ${selectedFormatFileSizeMsg}`;
        } else {
            selectedFormatFinalMsg = `Select a stream to download`;
        }
    }

    useEffect(() => {
        const updateBottomBarWidth = (): void => {
            if (containerRef.current && bottomBarRef.current) {
                bottomBarRef.current.style.width = `${containerRef.current.offsetWidth}px`;
                const containerRect = containerRef.current.getBoundingClientRect();
                bottomBarRef.current.style.left = `${containerRect.left}px`;
            }
        };
        updateBottomBarWidth();
        const resizeObserver = new ResizeObserver(() => {
            updateBottomBarWidth();
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        window.addEventListener('resize', updateBottomBarWidth);
        window.addEventListener('scroll', updateBottomBarWidth);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateBottomBarWidth);
            window.removeEventListener('scroll', updateBottomBarWidth);
        };
    }, []);

    useEffect(() => {
        useCustomCommands ? setActiveDownloadConfigurationTab('commands') : setActiveDownloadConfigurationTab('options');
    }, []);

    return (
        <div className="flex justify-between items-center gap-2 fixed bottom-0 right-0 p-4 w-full bg-background rounded-t-lg border-t border-border z-20" ref={bottomBarRef}>
            <div className="flex items-center gap-4">
                <div className="flex justify-center items-center p-3 rounded-md border border-border">
                    {activeDownloadModeTab === 'combine' && (
                        <Video className="w-4 h-4 stroke-primary" />
                    )}
                    {activeDownloadModeTab !== 'combine' && selectedFormatFileType && (selectedFormatFileType === 'video' || selectedFormatFileType === 'video+audio') && (
                        <Video className="w-4 h-4 stroke-primary" />
                    )}
                    {activeDownloadModeTab !== 'combine' && selectedFormatFileType && selectedFormatFileType === 'audio' && (
                        <Music className="w-4 h-4 stroke-primary" />
                    )}
                    {activeDownloadModeTab !== 'combine' && ((!selectedFormatFileType) || (selectedFormatFileType && selectedFormatFileType !== 'video' && selectedFormatFileType !== 'audio' && selectedFormatFileType !== 'video+audio')) && (
                        <File className="w-4 h-4 stroke-primary" />
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm text-nowrap max-w-120 xl:max-w-200 overflow-hidden text-ellipsis">{videoMetadata._type === 'video' ? videoMetadata.title : videoMetadata._type === 'playlist' ? selectedPlaylistVideos.length === 1 ? videoMetadata.entries[Number(selectedPlaylistVideos[0]) - 1].title : `${selectedPlaylistVideos.length} ${t.items}` : t.unknown }</span>
                    <span className="text-xs text-muted-foreground">{selectedFormatFinalMsg}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <DownloadConfigDialog selectedFormatFileType={selectedFormatFileType} />
                <Button
                onClick={async () => {
                    setIsStartingDownload(true);
                    try {
                        if (videoMetadata._type === 'playlist') {
                            await startDownload({
                                url: videoMetadata.original_url,
                                selectedFormat: activeDownloadModeTab === 'combine' ? `${selectedCombinableVideoFormat}+${selectedCombinableAudioFormats.join('+')}` : selectedDownloadFormat,
                                downloadConfig: downloadConfiguration,
                                selectedSubtitles: selectedSubtitles.length > 0 ? selectedSubtitles.join(',') : null,
                                playlistItems: selectedPlaylistVideos.sort((a, b) => Number(a) - Number(b)).join(','),
                                overrideOptions: isMultiplePlaylistItems ? {
                                    filesize: totalFilesize > 0 ? totalFilesize : undefined,
                                    tbr: totalTbr > 0 ? totalTbr : undefined,
                                } : isMultipleCombineableAudioSelected ? {
                                    filesize: totalFilesize > 0 ? totalFilesize : undefined,
                                    tbr: totalTbr > 0 ? totalTbr : undefined,
                                } : undefined
                            });
                        } else if (videoMetadata._type === 'video') {
                            await startDownload({
                                url: videoMetadata.webpage_url,
                                selectedFormat: activeDownloadModeTab === 'combine' ? `${selectedCombinableVideoFormat}+${selectedCombinableAudioFormats.join('+')}` : selectedDownloadFormat === 'best' ? videoMetadata.requested_downloads[0].format_id : selectedDownloadFormat,
                                downloadConfig: downloadConfiguration,
                                selectedSubtitles: selectedSubtitles.length > 0 ? selectedSubtitles.join(',') : null,
                                overrideOptions: isMultipleCombineableAudioSelected ? {
                                    filesize: totalFilesize > 0 ? totalFilesize : undefined,
                                    tbr: totalTbr > 0 ? totalTbr : undefined,
                                } : undefined
                            });
                        }
                        // toast({
                        //     title: 'Download Initiated',
                        //     description: 'Download initiated, it will start shortly.',
                        // });
                    } catch (error) {
                        console.error('Download failed to start:', error);
                        toast.error(t.failedToStartDownload, {
                            description: t.errorInitiatingDownload
                        });
                    } finally {
                        setIsStartingDownload(false);
                    }
                }}
                disabled={isStartingDownload || !selectedDownloadFormat || (activeDownloadModeTab === 'combine' && (!selectedCombinableVideoFormat || !isCombineableAudioSelected)) || (useCustomCommands && !downloadConfiguration.custom_command)}
                >
                    {isStartingDownload ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            {t.startingDownload}
                        </>
                    ) : (
                        t.startDownload
                    )}
                </Button>
            </div>
        </div>
    );
}
