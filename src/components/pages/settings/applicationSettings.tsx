import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBasePathsStore, useDownloaderPageStatesStore, useDownloadStatesStore, useEnvironmentStore, useSettingsPageStatesStore } from "@/services/store";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { BadgeCheck, BellRing, BrushCleaning, Bug, CircleCheck, Cookie, ExternalLink, FilePen, FileVideo, Folder, FolderOpen, Globe, Heart, Info, KeyRound, Loader2, LucideIcon, Mail, Monitor, Moon, Package, Scale, ShieldMinus, SquareTerminal, Sun, Terminal, Timer, Trash, TriangleAlert, WandSparkles, Wifi, Wrench } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { GithubIcon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { open } from '@tauri-apps/plugin-dialog';
import { useSettings } from "@/helpers/use-settings";
import { useYtDlpUpdater } from "@/helpers/use-ytdlp-updater";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import * as fs from "@tauri-apps/plugin-fs";
import { join } from "@tauri-apps/api/path";
import { formatSpeed, generateID } from "@/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification';
import { NeoDlpLogo } from "@/components/icons/neodlp";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { config } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import neosubhamoyImage from "@/assets/images/neosubhamoy.jpg";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NumberInput } from "@/components/custom/numberInput";
import usePotServer from "@/helpers/use-pot-server";
import { useI18n } from "@/i18n/i18nProvider";

const proxyUrlSchema = z.object({
    url: z.url({
        error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "Proxy URL is required"
        : "Invalid URL format"
    })
});

const rateLimitSchema = z.object({
    rate_limit: z.coerce.number<number>({
        error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "Rate Limit is required"
        : "Rate Limit must be a valid number"
    }).int({
        message: "Rate Limit must be an integer"
    }).min(1024, {
        message: "Rate Limit must be at least 1024 bytes/s (1 KB/s)"
    }).max(104857600, {
        message: "Rate Limit must be at most 104857600 bytes/s (100 MB/s)"
    }),
});

const addCustomCommandSchema = z.object({
    label: z.string().min(1, { message: "Label is required" }),
    args: z.string().min(1, { message: "Arguments are required" }),
});

const filenameTemplateShcema = z.object({
    template: z.string().min(1, { message: "Filename Template is required" }),
});

const minMaxSleepIntervalSchema = z.object({
    min_sleep_interval: z.coerce.number<number>({
        error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "Minimum Sleep Interval is required"
        : "Minimum Sleep Interval must be a valid number"
    }).int({
        message: "Minimum Sleep Interval must be an integer"
    }).min(1, {
        message: "Minimum Sleep Interval must be at least 1 second"
    }).max(3600, {
        message: "Minimum Sleep Interval must be at most 3600 seconds (1 hour)"
    }),
    max_sleep_interval: z.coerce.number<number>({
        error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "Maximum Sleep Interval is required"
        : "Maximum Sleep Interval must be a valid number"
    }).int({
        message: "Maximum Sleep Interval must be an integer"
    }).min(1, {
        message: "Maximum Sleep Interval must be at least 1 second"
    }).max(3600, {
        message: "Maximum Sleep Interval must be at most 3600 seconds (1 hour)"
    }),
})

const requestSleepIntervalSchema = z.object({
    request_sleep_interval: z.coerce.number<number>({
        error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "Request Sleep Interval is required"
        : "Request Sleep Interval must be a valid number"
    }).int({
        message: "Request Sleep Interval must be an integer"
    }).min(1, {
        message: "Request Sleep Interval must be at least 1 second"
    }).max(3600, {
        message: "Request Sleep Interval must be at most 3600 seconds (1 hour)"
    }),
})

const potServerPortSchema = z.object({
    port: z.coerce.number<number>({
        error: (issue) => issue.input === undefined || issue.input === null || issue.input === ""
        ? "POT Server Port is required"
        : "POT Server Port must be a valid number"
    }).int({
        message: "POT Server Port must be an integer"
    }).min(4000, {
        message: "POT Server Port must be at least 4000"
    }).max(5000, {
        message: "POT Server Port must be at most 5000"
    }),
});

function AppGeneralSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const maxParallelDownloads = useSettingsPageStatesStore(state => state.settings.max_parallel_downloads);
    const maxRetries = useSettingsPageStatesStore(state => state.settings.max_retries);
    const preferVideoOverPlaylist = useSettingsPageStatesStore(state => state.settings.prefer_video_over_playlist);
    const strictDownloadabilityCheck = useSettingsPageStatesStore(state => state.settings.strict_downloadablity_check);
    const useAria2 = useSettingsPageStatesStore(state => state.settings.use_aria2);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    return (
        <>
        <div className="max-parallel-downloads">
            <h3 className="font-semibold">{t.maxParallelDownloads}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.setMaxParallelDownloads}</p>
            <Slider
            id="max-parallel-downloads"
            className="w-87.5 mb-2"
            value={[maxParallelDownloads]}
            min={1}
            max={5}
            onValueChange={(value) => saveSettingsKey('max_parallel_downloads', value[0])}
            />
            <Label htmlFor="max-parallel-downloads" className="text-xs text-muted-foreground">({t.current}: {maxParallelDownloads}) (Default: 2, Maximum: 5)</Label>
        </div>
        <div className="prefer-video-over-playlist">
            <h3 className="font-semibold">{t.preferVideoOverPlaylist}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.preferVideoOverPlaylistDesc}</p>
            <Switch
            id="prefer-video-over-playlist"
            checked={preferVideoOverPlaylist}
            onCheckedChange={(checked) => saveSettingsKey('prefer_video_over_playlist', checked)}
            />
        </div>
        <div className="strict-downloadability-check">
            <h3 className="font-semibold">{t.strictDownloadabilityCheck}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.strictDownloadabilityCheckDesc}</p>
            <Switch
            id="strict-downloadablity-check"
            checked={strictDownloadabilityCheck}
            onCheckedChange={(checked) => saveSettingsKey('strict_downloadablity_check', checked)}
            />
        </div>
        <div className="max-retries">
            <h3 className="font-semibold">{t.maxRetries}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.setMaxRetries}</p>
            <Slider
            id="max-retries"
            className="w-87.5 mb-2"
            value={[maxRetries]}
            min={1}
            max={100}
            onValueChange={(value) => saveSettingsKey('max_retries', value[0])}
            />
            <Label htmlFor="max-retries" className="text-xs text-muted-foreground">({t.current}: {maxRetries}) (Default: 5, Maximum: 100)</Label>
        </div>
        <div className="aria2">
            <h3 className="font-semibold">{t.aria2}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.aria2Desc}</p>
            <Switch
            id="aria2"
            checked={useAria2}
            onCheckedChange={(checked) => saveSettingsKey('use_aria2', checked)}
            disabled={useCustomCommands}
            />
        </div>
        </>
    );
}

function AppAppearanceSettings() {
    const { saveSettingsKey } = useSettings();
    const { t, language, setLanguage } = useI18n();

    const appTheme = useSettingsPageStatesStore(state => state.settings.theme);
    const appColorScheme = useSettingsPageStatesStore(state => state.settings.color_scheme);

    const themeOptions: { value: string; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: t.light },
        { value: 'dark', icon: Moon, label: t.dark },
        { value: 'system', icon: Monitor, label: t.system },
    ];

    const colorSchemeOptions: { value: string; label: string }[] = [
        { value: 'default', label: t.default },
        { value: 'blue', label: t.blue },
        { value: 'green', label: t.green },
        { value: 'orange', label: t.orange },
        { value: 'red', label: t.red },
        { value: 'rose', label: t.rose },
        { value: 'violet', label: t.violet },
        { value: 'yellow', label: t.yellow },
    ];

    const languageOptions: { value: string; label: string }[] = [
        { value: 'en', label: t.english },
        { value: 'zh-CN', label: t.simplifiedChinese },
    ];

    return (
        <>
        <div className="app-theme">
            <h3 className="font-semibold">{t.theme}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.chooseAppTheme}</p>
            <div className={cn('inline-flex gap-1 rounded-lg p-1 bg-muted')}>
                {themeOptions.map(({ value, icon: Icon, label }) => (
                    <button
                        key={value}
                        onClick={() => saveSettingsKey('theme', value)}
                        className={cn(
                            'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                            appTheme === value
                                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                        )}
                    >
                        <Icon className="-ml-1 h-4 w-4" />
                        <span className="ml-1.5 text-sm">{label}</span>
                    </button>
                ))}
            </div>
        </div>
        <div className="app-color-scheme">
            <h3 className="font-semibold">{t.colorScheme}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.chooseAppColorScheme}</p>
            <ToggleGroup
            type="single"
            variant="outline"
            className="flex flex-col items-start gap-2 mt-1"
            value={appColorScheme}
            onValueChange={(value) => saveSettingsKey('color_scheme', value)}
            >
                <div className="flex gap-2 flex-wrap items-center">
                    {colorSchemeOptions.map(({ value, label }) => (
                        <ToggleGroupItem
                            key={value}
                            className="text-xs text-nowrap border-2 data-[state=on]:border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/10 hover:bg-muted/70"
                            size="sm"
                            value={value}
                        >
                            <span className="relative flex gap-1 items-center">
                            {
                                <span
                                    className={cn(
                                        'inline-block w-3 h-3 rounded-full border border-border',
                                        value === 'default' && 'bg-neutral-900 dark:bg-neutral-100',
                                        value === 'blue' && 'bg-blue-500',
                                        value === 'green' && 'bg-green-500',
                                        value === 'orange' && 'bg-orange-500',
                                        value === 'red' && 'bg-red-500',
                                        value === 'rose' && 'bg-rose-500',
                                        value === 'violet' && 'bg-violet-500',
                                        value === 'yellow' && 'bg-yellow-500',
                                    )}
                                />
                            }
                            {label}
                            </span>
                        </ToggleGroupItem>
                    ))}
                </div>
            </ToggleGroup>
        </div>
        <div className="app-language mt-6">
            <h3 className="font-semibold">{t.language}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.selectLanguage}</p>
            <ToggleGroup
            type="single"
            variant="outline"
            className="flex flex-col items-start gap-2 mt-1"
            value={language}
            onValueChange={(value) => setLanguage(value as any)}
            >
                <div className="flex gap-2 flex-wrap items-center">
                    {languageOptions.map(({ value, label }) => (
                        <ToggleGroupItem
                            key={value}
                            className="text-xs text-nowrap border-2 data-[state=on]:border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/10 hover:bg-muted/70"
                            size="sm"
                            value={value}
                        >
                            {label}
                        </ToggleGroupItem>
                    ))}
                </div>
            </ToggleGroup>
        </div>
        </>
    );
}

function AppFilesystemSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const isFlatpak = useEnvironmentStore(state => state.isFlatpak);

    const formResetTrigger = useSettingsPageStatesStore(state => state.formResetTrigger);
    const acknowledgeFormReset = useSettingsPageStatesStore(state => state.acknowledgeFormReset);

    const downloadDirPath = useBasePathsStore((state) => state.downloadDirPath);
    const tempDownloadDirPath = useBasePathsStore((state) => state.tempDownloadDirPath);
    const setPath = useBasePathsStore((state) => state.setPath);

    const filenameTemplate = useSettingsPageStatesStore(state => state.settings.filename_template);
    const windowsFilenames = useSettingsPageStatesStore(state => state.settings.windows_filenames);
    const restrictFilenames = useSettingsPageStatesStore(state => state.settings.restrict_filenames);

    const downloadStates = useDownloadStatesStore(state => state.downloadStates);
    const ongoingDownloads = downloadStates.filter(state =>
        ['starting', 'downloading', 'queued'].includes(state.download_status)
    );

    const cleanTemporaryDownloads = async () => {
        const tempFiles = await fs.readDir(tempDownloadDirPath ?? '');
        if (tempFiles.length > 0) {
            try {
                for (const file of tempFiles) {
                    if (file.isFile) {
                        const filePath = await join(tempDownloadDirPath ?? '', file.name);
                        await fs.remove(filePath);
                    }
                }
                toast.success(t.tempDownloadsCleaned, {
                    description: t.tempDownloadsCleanedDesc,
                });
            } catch (e) {
                toast.error(t.tempDownloadsCleanupFailed, {
                    description: t.tempDownloadsCleanupFailedDesc,
                });
            }
        } else {
            toast.info(t.noTempDownloads, {
                description: t.noTempDownloadsDesc,
            });
        }
    }

    const filenameTemplateForm = useForm<z.infer<typeof filenameTemplateShcema>>({
        resolver: zodResolver(filenameTemplateShcema),
        defaultValues: {
            template: filenameTemplate,
        },
        mode: "onChange",
    });
    const watchedFilenameTemplate = filenameTemplateForm.watch("template");
    const { errors: filenameTemplateFormErrors } = filenameTemplateForm.formState;

    function handleFilenameTemplateSubmit(values: z.infer<typeof filenameTemplateShcema>) {
        try {
            saveSettingsKey('filename_template', values.template);
            toast.success(t.filenameTemplateUpdated, {
                description: `${t.filenameTemplateUpdatedDesc}${values.template}`,
            });
        } catch (error) {
            console.error("Error changing filename template:", error);
            toast.error(t.filenameTemplateUpdateFailed, {
                description: t.filenameTemplateUpdateFailedDesc,
            });
        }
    }

    useEffect(() => {
        if (formResetTrigger > 0) {
            filenameTemplateForm.reset();
            acknowledgeFormReset();
        }
    }, [formResetTrigger]);

    return (
        <>
        <div className="download-dir">
            <h3 className="font-semibold">{t.downloadFolder}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.setDefaultDownloadFolder}</p>
            <div className="flex items-center gap-4">
                <Input className="focus-visible:ring-0" type="text" placeholder={t.selectDownloadDirectory} value={downloadDirPath ?? t.unknown} readOnly/>
                <Button
                variant="outline"
                disabled={isFlatpak}
                onClick={async () => {
                    try {
                        const folder = await open({
                            multiple: false,
                            directory: true,
                        });
                        if (folder) {
                            saveSettingsKey('download_dir', folder);
                            setPath('downloadDirPath', folder);
                        }
                    } catch (error) {
                        console.error("Error selecting folder:", error);
                        toast.error(t.failedToSelectFolder, {
                            description: t.failedToSelectFolderDesc,
                        });
                    }
                }}
                >
                    <FolderOpen className="w-4 h-4" /> {t.browse}
                </Button>
            </div>
        </div>
        <div className="temporary-download-dir">
            <h3 className="font-semibold">{t.temporaryDownloadFolder}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.cleanupTempDownloads}</p>
            <div className="flex items-center gap-4">
                <Input className="focus-visible:ring-0" type="text" placeholder={t.temporaryDownloadDirectory} value={tempDownloadDirPath ?? t.unknown} readOnly/>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                        variant="destructive"
                        disabled={ongoingDownloads.length > 0 || isFlatpak}
                        >
                            <BrushCleaning className="size-4" /> {t.clean}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{t.cleanUpAllTempDownloads}</AlertDialogTitle>
                            <AlertDialogDescription>{t.cleanUpAllTempDownloadsDesc}</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                            <AlertDialogAction
                            onClick={() => cleanTemporaryDownloads()}
                            >{t.clean}</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
        <div className="filename-template">
            <h3 className="font-semibold">{t.filenameTemplate}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.setFilenameTemplate}</p>
            <Form {...filenameTemplateForm}>
                <form onSubmit={filenameTemplateForm.handleSubmit(handleFilenameTemplateSubmit)} className="flex gap-4 w-full" autoComplete="off">
                    <FormField
                        control={filenameTemplateForm.control}
                        name="template"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                    className="focus-visible:ring-0"
                                    placeholder={t.enterFilenameTemplate}
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!watchedFilenameTemplate || watchedFilenameTemplate === filenameTemplate || Object.keys(filenameTemplateFormErrors).length > 0}
                    >
                        {t.save}
                    </Button>
                </form>
            </Form>
        </div>
        <div className="sanitize-filenames">
            <h3 className="font-semibold">{t.sanitizeFilenames}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.sanitizeFilenamesDesc}</p>
            <div className="flex items-center space-x-2 mb-3">
                <Switch
                id="windows-filenames"
                checked={windowsFilenames}
                onCheckedChange={(checked) => saveSettingsKey('windows_filenames', checked)}
                />
                <Label htmlFor="windows-filenames">{t.windowsCompatibility}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                id="restrict-filenames"
                checked={restrictFilenames}
                onCheckedChange={(checked) => saveSettingsKey('restrict_filenames', checked)}
                />
                <Label htmlFor="restrict-filenames">{t.forceAsciiOnly}</Label>
            </div>
        </div>
        </>
    );
}

function AppFormatSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const videoFormat = useSettingsPageStatesStore(state => state.settings.video_format);
    const audioFormat = useSettingsPageStatesStore(state => state.settings.audio_format);
    const alwaysReencodeVideo = useSettingsPageStatesStore(state => state.settings.always_reencode_video);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    return (
        <>
        <div className="video-format">
            <h3 className="font-semibold">{t.videoFormat}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.chooseVideoFormat}</p>
            <RadioGroup
            orientation="horizontal"
            className="flex items-center gap-4"
            value={videoFormat}
            onValueChange={(value) => saveSettingsKey('video_format', value)}
            disabled={useCustomCommands}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="auto" id="v-auto" />
                    <Label htmlFor="v-auto">{t.auto}</Label>
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
        </div>
        <div className="audio-format">
            <h3 className="font-semibold">{t.audioFormat}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.chooseAudioFormat}</p>
            <RadioGroup
            orientation="horizontal"
            className="flex items-center gap-4"
            value={audioFormat}
            onValueChange={(value) => saveSettingsKey('audio_format', value)}
            disabled={useCustomCommands}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="auto" id="a-auto" />
                    <Label htmlFor="a-auto">{t.auto}</Label>
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
        </div>
        <div className="always-reencode-video">
            <h3 className="font-semibold">{t.alwaysReencodeVideo}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.alwaysReencodeVideoDesc}</p>
            <Switch
            id="always-reencode-video"
            checked={alwaysReencodeVideo}
            onCheckedChange={(checked) => saveSettingsKey('always_reencode_video', checked)}
            disabled={useCustomCommands}
            />
        </div>
        </>
    );
}

function AppEmbeddingSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const embedVideoMetadata = useSettingsPageStatesStore(state => state.settings.embed_video_metadata);
    const embedAudioMetadata = useSettingsPageStatesStore(state => state.settings.embed_audio_metadata);
    const embedVideoThumbnail = useSettingsPageStatesStore(state => state.settings.embed_video_thumbnail);
    const embedAudioThumbnail = useSettingsPageStatesStore(state => state.settings.embed_audio_thumbnail);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    return (
        <>
        <div className="embed-metadata">
            <h3 className="font-semibold">{t.embedMetadata}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.embedMetadataDesc}</p>
            <div className="flex items-center space-x-2 mb-3">
                <Switch
                id="embed-video-metadata"
                checked={embedVideoMetadata}
                onCheckedChange={(checked) => saveSettingsKey('embed_video_metadata', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="embed-video-metadata">{t.video}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                id="embed-audio-metadata"
                checked={embedAudioMetadata}
                onCheckedChange={(checked) => saveSettingsKey('embed_audio_metadata', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="embed-audio-metadata">{t.audio}</Label>
            </div>
        </div>
        <div className="embed-thumbnail">
            <h3 className="font-semibold">{t.embedThumbnail}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.embedThumbnailDesc}</p>
            <div className="flex items-center space-x-2 mb-3">
                <Switch
                id="embed-video-thumbnail"
                checked={embedVideoThumbnail}
                onCheckedChange={(checked) => saveSettingsKey('embed_video_thumbnail', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="embed-video-thumbnail">{t.video}</Label>
            </div>
            <div className="flex items-center space-x-2">
                <Switch
                id="embed-audio-thumbnail"
                checked={embedAudioThumbnail}
                onCheckedChange={(checked) => saveSettingsKey('embed_audio_thumbnail', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="embed-audio-thumbnail">{t.audio}</Label>
            </div>
        </div>
        </>
    );
}

function AppNetworkSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const formResetTrigger = useSettingsPageStatesStore(state => state.formResetTrigger);
    const acknowledgeFormReset = useSettingsPageStatesStore(state => state.acknowledgeFormReset);

    const useProxy = useSettingsPageStatesStore(state => state.settings.use_proxy);
    const proxyUrl = useSettingsPageStatesStore(state => state.settings.proxy_url);
    const useRateLimit = useSettingsPageStatesStore(state => state.settings.use_rate_limit);
    const rateLimit = useSettingsPageStatesStore(state => state.settings.rate_limit);
    const useForceInternetProtocol = useSettingsPageStatesStore(state => state.settings.use_force_internet_protocol);
    const forceInternetProtocol = useSettingsPageStatesStore(state => state.settings.force_internet_protocol);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    const proxyUrlForm = useForm<z.infer<typeof proxyUrlSchema>>({
        resolver: zodResolver(proxyUrlSchema),
        defaultValues: {
            url: proxyUrl,
        },
        mode: "onChange",
    });
    const watchedProxyUrl = proxyUrlForm.watch("url");
    const { errors: proxyUrlFormErrors } = proxyUrlForm.formState;

    function handleProxyUrlSubmit(values: z.infer<typeof proxyUrlSchema>) {
        try {
            saveSettingsKey('proxy_url', values.url);
            toast.success(t.proxyUrlUpdated, {
                description: `${t.proxyUrlUpdatedDesc}${values.url}`,
            });
        } catch (error) {
            console.error("Error changing proxy URL:", error);
            toast.error(t.proxyUrlUpdateFailed, {
                description: t.proxyUrlUpdateFailedDesc,
            });
        }
    }

    const rateLimitForm = useForm<z.infer<typeof rateLimitSchema>>({
        resolver: zodResolver(rateLimitSchema),
        defaultValues: {
            rate_limit: rateLimit,
        },
        mode: "onChange",
    });
    const watchedRateLimit = rateLimitForm.watch("rate_limit");
    const { errors: rateLimitFormErrors } = rateLimitForm.formState;

    function handleRateLimitSubmit(values: z.infer<typeof rateLimitSchema>) {
        try {
            saveSettingsKey('rate_limit', values.rate_limit);
            toast.success(t.rateLimitUpdated, {
                description: `${t.rateLimitUpdatedDesc}${values.rate_limit} bytes/s`,
            });
        } catch (error) {
            console.error("Error changing rate limit:", error);
            toast.error(t.rateLimitUpdateFailed, {
                description: t.rateLimitUpdateFailedDesc,
            });
        }
    }

    useEffect(() => {
        if (formResetTrigger > 0) {
            proxyUrlForm.reset();
            rateLimitForm.reset();
            acknowledgeFormReset();
        }
    }, [formResetTrigger]);

    return (
        <>
        <div className="proxy">
            <h3 className="font-semibold">{t.proxy}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.proxyDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-proxy"
                checked={useProxy}
                onCheckedChange={(checked) => saveSettingsKey('use_proxy', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="use-proxy">{t.useProxy}</Label>
            </div>
            <Form {...proxyUrlForm}>
                <form onSubmit={proxyUrlForm.handleSubmit(handleProxyUrlSubmit)} className="flex gap-4 w-full" autoComplete="off">
                    <FormField
                        control={proxyUrlForm.control}
                        name="url"
                        disabled={!useProxy}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                    className="focus-visible:ring-0"
                                    placeholder={t.enterProxyUrl}
                                    readOnly={useCustomCommands}
                                    {...field}
                                    />
                                </FormControl>
                                <Label htmlFor="url" className="text-xs text-muted-foreground">({t.configured}: {proxyUrl ? t.yes : t.no}, {t.status}: {useProxy && !useCustomCommands ? t.enabled : t.disabled})</Label>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!watchedProxyUrl || watchedProxyUrl === proxyUrl || Object.keys(proxyUrlFormErrors).length > 0 || !useProxy}
                    >
                        {t.save}
                    </Button>
                </form>
            </Form>
        </div>
        <div className="rate-limit">
            <h3 className="font-semibold">{t.rateLimit}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.rateLimitDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-rate-limit"
                checked={useRateLimit}
                onCheckedChange={(checked) => saveSettingsKey('use_rate_limit', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="use-rate-limit">{t.useRateLimit}</Label>
            </div>
            <Form {...rateLimitForm}>
                <form onSubmit={rateLimitForm.handleSubmit(handleRateLimitSubmit)} className="flex gap-4 w-full" autoComplete="off">
                    <FormField
                        control={rateLimitForm.control}
                        name="rate_limit"
                        disabled={!useRateLimit}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <NumberInput
                                    className="w-full"
                                    placeholder={t.enterRateLimit}
                                    min={0}
                                    readOnly={useCustomCommands}
                                    {...field}
                                    />
                                </FormControl>
                                <Label htmlFor="rate_limit" className="text-xs text-muted-foreground">({t.configured}: {rateLimit ? `${rateLimit} = ${formatSpeed(rateLimit)}` : t.no}, {t.status}: {useRateLimit && !useCustomCommands ? t.enabled : t.disabled}) ({t.default}: 1048576, {t.range}: 1024-104857600)</Label>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        disabled={!watchedRateLimit || Number(watchedRateLimit) === rateLimit || Object.keys(rateLimitFormErrors).length > 0 || !useRateLimit}
                    >
                        {t.save}
                    </Button>
                </form>
            </Form>
        </div>
        <div className="force-internet-protocol">
            <h3 className="font-semibold">{t.forceInternetProtocol}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.forceInternetProtocolDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-force-internet-protocol"
                checked={useForceInternetProtocol}
                onCheckedChange={(checked) => saveSettingsKey('use_force_internet_protocol', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="use-force-internet-protocol">{t.forceIpv}</Label>
            </div>
            <RadioGroup
            orientation="horizontal"
            className="flex items-center gap-4 mb-2"
            value={forceInternetProtocol}
            onValueChange={(value) => saveSettingsKey('force_internet_protocol', value)}
            disabled={!useForceInternetProtocol || useCustomCommands}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="ipv4" id="force-ipv4" />
                    <Label htmlFor="force-ipv4">{t.useIpv4Only}</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="ipv6" id="force-ipv6" />
                    <Label htmlFor="force-ipv6">{t.useIpv6Only}</Label>
                </div>
            </RadioGroup>
            <Label className="text-xs text-muted-foreground">({t.forced}: {forceInternetProtocol === "ipv4" ? 'IPv4' : 'IPv6'}, {t.status}: {useForceInternetProtocol && !useCustomCommands ? t.enabled : t.disabled})</Label>
        </div>
        </>
    );
}

function AppCookiesSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const isFlatpak = useEnvironmentStore(state => state.isFlatpak);

    const useCookies = useSettingsPageStatesStore(state => state.settings.use_cookies);
    const importCookiesFrom = useSettingsPageStatesStore(state => state.settings.import_cookies_from);
    const cookiesBrowser = useSettingsPageStatesStore(state => state.settings.cookies_browser);
    const cookiesFile = useSettingsPageStatesStore(state => state.settings.cookies_file);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    return (
        <>
        <div className="cookies">
            <h3 className="font-semibold">{t.cookiesSettings}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.cookiesDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-cookies"
                checked={useCookies}
                onCheckedChange={(checked) => saveSettingsKey('use_cookies', checked)}
                disabled={useCustomCommands || isFlatpak}
                />
                <Label htmlFor="use-cookies">{t.useCookies}</Label>
            </div>
            <RadioGroup
            orientation="horizontal"
            className="flex items-center gap-4"
            value={importCookiesFrom}
            onValueChange={(value) => saveSettingsKey('import_cookies_from', value)}
            disabled={!useCookies || useCustomCommands || isFlatpak}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="browser" id="cookies-browser" />
                    <Label htmlFor="cookies-browser">{t.importFromBrowser}</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="file" id="cookies-file" />
                    <Label htmlFor="cookies-file">{t.importFromTextFile}</Label>
                </div>
            </RadioGroup>
            <div className="flex flex-col gap-2 mt-5 mb-2">
                <Label className="text-xs">{t.importCookiesFromBrowser}</Label>
                <Select
                value={cookiesBrowser}
                onValueChange={(value) => saveSettingsKey('cookies_browser', value)}
                disabled={importCookiesFrom !== "browser" || !useCookies || useCustomCommands || isFlatpak}
                >
                    <SelectTrigger className="w-57.5 ring-0 focus:ring-0">
                        <SelectValue placeholder={t.selectBrowserToImport} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>{t.browsers}</SelectLabel>
                            <SelectItem value="firefox">{t.firefoxRecommended}</SelectItem>
                            <SelectItem value="chrome">{t.chrome}</SelectItem>
                            <SelectItem value="chromium">{t.chromium}</SelectItem>
                            <SelectItem value="safari">{t.safari}</SelectItem>
                            <SelectItem value="brave">{t.brave}</SelectItem>
                            <SelectItem value="edge">{t.edge}</SelectItem>
                            <SelectItem value="opera">{t.opera}</SelectItem>
                            <SelectItem value="vivaldi">{t.vivaldi}</SelectItem>
                            <SelectItem value="whale">{t.whale}</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2 mt-3 mb-2">
                <Label className="text-xs">{t.importCookiesFromTextFile}</Label>
                <div className="flex items-center gap-4">
                    <Input className="focus-visible:ring-0" type="text" placeholder={t.selectCookiesTextFile} value={cookiesFile ?? ''} disabled={importCookiesFrom !== "file" || !useCookies} readOnly/>
                    <Button
                    variant="outline"
                    disabled={importCookiesFrom !== "file" || !useCookies || useCustomCommands || isFlatpak}
                    onClick={async () => {
                        try {
                            const file = await open({
                                multiple: false,
                                directory: false,
                                filters: [
                                    { name: t.text, extensions: ['txt'] },
                                ],
                            });
                            if (file && typeof file === 'string') {
                                saveSettingsKey('cookies_file', file);
                            }
                        } catch (error) {
                            console.error("Error selecting file:", error);
                            toast.error(t.failedToSelectCookiesFile, {
                                description: t.failedToSelectCookiesFileDesc,
                            });
                        }
                    }}
                    >
                        <FolderOpen className="w-4 h-4" /> {t.browse}
                    </Button>
                </div>
            </div>
            <Label className="text-xs text-muted-foreground">({t.configured}: {importCookiesFrom === "browser" ? t.yes : cookiesFile ? t.yes : t.no}, {t.from}: {importCookiesFrom === "browser" ? t.browser : t.text}, {t.status}: {useCookies && !useCustomCommands ? t.enabled : t.disabled})</Label>
        </div>
        </>
    );
}

function AppSponsorblockSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const useSponsorblock = useSettingsPageStatesStore(state => state.settings.use_sponsorblock);
    const sponsorblockMode = useSettingsPageStatesStore(state => state.settings.sponsorblock_mode);
    const sponsorblockRemove = useSettingsPageStatesStore(state => state.settings.sponsorblock_remove);
    const sponsorblockMark = useSettingsPageStatesStore(state => state.settings.sponsorblock_mark);
    const sponsorblockRemoveCategories = useSettingsPageStatesStore(state => state.settings.sponsorblock_remove_categories);
    const sponsorblockMarkCategories = useSettingsPageStatesStore(state => state.settings.sponsorblock_mark_categories);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    const sponsorblockCategories: { code: string; label: string }[] = [
        { code: 'sponsor', label: t.sponsorship },
        { code: 'intro', label: t.intro },
        { code: 'outro', label: t.outro },
        { code: 'interaction', label: t.interaction },
        { code: 'selfpromo', label: t.selfPromotion },
        { code: 'music_offtopic', label: t.musicOfftopic },
        { code: 'preview', label: t.preview },
        { code: 'filler', label: t.filler },
        { code: 'poi_highlight', label: t.pointOfInterest },
        { code: 'chapter', label: t.chapter },
        { code: 'hook', label: t.hook },
    ];

    return (
        <>
        <div className="sponsorblock">
            <h3 className="font-semibold">{t.sponsorblockSettings}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.sponsorblockDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-sponsorblock"
                checked={useSponsorblock}
                onCheckedChange={(checked) => saveSettingsKey('use_sponsorblock', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="use-sponsorblock">{t.useSponsorblock}</Label>
            </div>
            <RadioGroup
            orientation="horizontal"
            className="flex items-center gap-4"
            value={sponsorblockMode}
            onValueChange={(value) => saveSettingsKey('sponsorblock_mode', value)}
            disabled={!useSponsorblock || useCustomCommands}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="remove" id="sponsorblock-remove" />
                    <Label htmlFor="sponsorblock-remove">{t.removeSegments}</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="mark" id="sponsorblock-mark" />
                    <Label htmlFor="sponsorblock-mark">{t.markSegments}</Label>
                </div>
            </RadioGroup>
            <div className="flex flex-col gap-2 mt-5">
                <Label className="text-xs mb-1">{t.sponsorblockRemoveCategories}</Label>
                <RadioGroup
                orientation="horizontal"
                className="flex items-center gap-4"
                value={sponsorblockRemove}
                onValueChange={(value) => saveSettingsKey('sponsorblock_remove', value)}
                disabled={/*!useSponsorblock || sponsorblockMode !== "remove" ||*/ useCustomCommands}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="default" id="sponsorblock-remove-default" />
                        <Label htmlFor="sponsorblock-remove-default">{t.default}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="all" id="sponsorblock-remove-all" />
                        <Label htmlFor="sponsorblock-remove-all">{t.all}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="custom" id="sponsorblock-remove-custom" />
                        <Label htmlFor="sponsorblock-remove-custom">{t.custom}</Label>
                    </div>
                </RadioGroup>
                <ToggleGroup
                type="multiple"
                variant="outline"
                className="flex flex-col items-start gap-2 mt-1"
                value={sponsorblockRemove === "custom" ? sponsorblockRemoveCategories : sponsorblockRemove === "default" ? sponsorblockCategories.filter((cat) => cat.code !== 'poi_highlight' && cat.code !== 'filler').map((cat) => cat.code) : sponsorblockRemove === "all" ? sponsorblockCategories.filter((cat) => cat.code !== 'poi_highlight').map((cat) => cat.code) : []}
                onValueChange={(value) => saveSettingsKey('sponsorblock_remove_categories', value)}
                disabled={/*!useSponsorblock || sponsorblockMode !== "remove" ||*/ sponsorblockRemove !== "custom" || useCustomCommands}
                >
                    <div className="flex gap-2 flex-wrap items-center">
                        {sponsorblockCategories.map((category) => (
                            category.code !== "poi_highlight" && (
                                <ToggleGroupItem
                                className="text-xs text-nowrap border-2 data-[state=on]:border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/10 hover:bg-muted/70"
                                value={category.code}
                                size="sm"
                                aria-label={category.label}
                                key={category.code}
                                >
                                    {category.label}
                                </ToggleGroupItem>
                            )
                        ))}
                    </div>
                </ToggleGroup>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <Label className="text-xs mb-1">{t.sponsorblockMarkCategories}</Label>
                <RadioGroup
                orientation="horizontal"
                className="flex items-center gap-4"
                value={sponsorblockMark}
                onValueChange={(value) => saveSettingsKey('sponsorblock_mark', value)}
                disabled={/*!useSponsorblock || sponsorblockMode !== "mark" ||*/ useCustomCommands}
                >
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="default" id="sponsorblock-mark-default" />
                        <Label htmlFor="sponsorblock-mark-default">{t.default}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="all" id="sponsorblock-mark-all" />
                        <Label htmlFor="sponsorblock-mark-all">{t.all}</Label>
                    </div>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="custom" id="sponsorblock-mark-custom" />
                        <Label htmlFor="sponsorblock-mark-custom">{t.custom}</Label>
                    </div>
                </RadioGroup>
                <ToggleGroup
                type="multiple"
                variant="outline"
                className="flex flex-col items-start gap-2 mt-1 mb-2"
                value={sponsorblockMark === "custom" ? sponsorblockMarkCategories : sponsorblockMark === "default" ? sponsorblockCategories.map((cat) => cat.code) : sponsorblockMark === "all" ? sponsorblockCategories.map((cat) => cat.code) : []}
                onValueChange={(value) => saveSettingsKey('sponsorblock_mark_categories', value)}
                disabled={/*!useSponsorblock || sponsorblockMode !== "mark" ||*/ sponsorblockMark !== "custom" || useCustomCommands}
                >
                    <div className="flex gap-2 flex-wrap items-center">
                        {sponsorblockCategories.map((category) => (
                            <ToggleGroupItem
                            className="text-xs text-nowrap border-2 data-[state=on]:border-2 data-[state=on]:border-primary data-[state=on]:bg-primary/10 hover:bg-muted/70"
                            value={category.code}
                            size="sm"
                            aria-label={category.label}
                            key={category.code}
                            >
                                {category.label}
                            </ToggleGroupItem>
                        ))}
                    </div>
                </ToggleGroup>
            </div>
            <Label className="text-xs text-muted-foreground">({t.configured}: {sponsorblockMode === "remove" && sponsorblockRemove === "custom" && sponsorblockRemoveCategories.length <= 0 ? t.no : sponsorblockMode === "mark" && sponsorblockMark === "custom" && sponsorblockMarkCategories.length <= 0 ? t.no : t.yes}, {t.mode}: {sponsorblockMode === "remove" ? t.removeSegments : t.markSegments}, {t.status}: {useSponsorblock && !useCustomCommands ? t.enabled : t.disabled})</Label>
        </div>
        </>
    );
}

function AppDelaySettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const formResetTrigger = useSettingsPageStatesStore(state => state.formResetTrigger);
    const acknowledgeFormReset = useSettingsPageStatesStore(state => state.acknowledgeFormReset);

    const useDelay = useSettingsPageStatesStore(state => state.settings.use_delay);
    const useSearchDelay = useSettingsPageStatesStore(state => state.settings.use_search_delay);
    const delayMode = useSettingsPageStatesStore(state => state.settings.delay_mode);
    const minSleepInterval = useSettingsPageStatesStore(state => state.settings.min_sleep_interval);
    const maxSleepInterval = useSettingsPageStatesStore(state => state.settings.max_sleep_interval);
    const requestSleepInterval = useSettingsPageStatesStore(state => state.settings.request_sleep_interval);
    const delayPlaylistOnly = useSettingsPageStatesStore(state => state.settings.delay_playlist_only);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);

    const minMaxSleepIntervalForm = useForm<z.infer<typeof minMaxSleepIntervalSchema>>({
        resolver: zodResolver(minMaxSleepIntervalSchema),
        defaultValues: {
            min_sleep_interval: minSleepInterval,
            max_sleep_interval: maxSleepInterval,
        },
        mode: "onChange",
    });
    const watchedMinSleepInterval = minMaxSleepIntervalForm.watch("min_sleep_interval");
    const watchedMaxSleepInterval = minMaxSleepIntervalForm.watch("max_sleep_interval");
    const { errors: minMaxSleepIntervalFormErrors } = minMaxSleepIntervalForm.formState;

    function handleMinMaxSleepIntervalSubmit(values: z.infer<typeof minMaxSleepIntervalSchema>) {
        try {
            saveSettingsKey('min_sleep_interval', values.min_sleep_interval);
            saveSettingsKey('max_sleep_interval', values.max_sleep_interval);
            toast.success(t.sleepIntervalsUpdated, {
                description: `${t.sleepIntervalsUpdatedDesc}${values.min_sleep_interval} seconds, Maximum Sleep Interval changed to ${values.max_sleep_interval} seconds`,
            });
        } catch (error) {
            console.error("Error changing sleep intervals:", error);
            toast.error(t.sleepIntervalsUpdateFailed, {
                description: t.sleepIntervalsUpdateFailedDesc,
            });
        }
    }

    const requestSleepIntervalForm = useForm<z.infer<typeof requestSleepIntervalSchema>>({
        resolver: zodResolver(requestSleepIntervalSchema),
        defaultValues: {
            request_sleep_interval: requestSleepInterval,
        },
        mode: "onChange",
    });
    const watchedRequestSleepInterval = requestSleepIntervalForm.watch("request_sleep_interval");
    const { errors: requestSleepIntervalFormErrors } = requestSleepIntervalForm.formState;

    function handleRequestSleepIntervalSubmit(values: z.infer<typeof requestSleepIntervalSchema>) {
        try {
            saveSettingsKey('request_sleep_interval', values.request_sleep_interval);
            toast.success(t.sleepIntervalsUpdated, {
                description: `Request Sleep Interval changed to ${values.request_sleep_interval} seconds`,
            });
        } catch (error) {
            console.error("Error changing request sleep interval:", error);
            toast.error(t.sleepIntervalsUpdateFailed, {
                description: t.sleepIntervalsUpdateFailedDesc,
            });
        }
    }

    useEffect(() => {
        if (formResetTrigger > 0) {
            minMaxSleepIntervalForm.reset();
            requestSleepIntervalForm.reset();
            acknowledgeFormReset();
        }
    }, [formResetTrigger]);

    return (
        <>
        <div className="delay">
            <h3 className="font-semibold">{t.delay}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.delayDesc}</p>
            <div className="flex items-center space-x-2 mb-3">
                <Switch
                id="use-delay"
                checked={useDelay}
                onCheckedChange={(checked) => saveSettingsKey('use_delay', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="use-delay">{t.useDelayInDownloads}</Label>
            </div>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-search-delay"
                checked={useSearchDelay}
                onCheckedChange={(checked) => saveSettingsKey('use_search_delay', checked)}
                disabled={useCustomCommands}
                />
                <Label htmlFor="use-search-delay">{t.useDelayInSearch}</Label>
            </div>
            <RadioGroup
            orientation="horizontal"
            className="flex items-center gap-4"
            value={delayMode}
            onValueChange={(value) => saveSettingsKey('delay_mode', value)}
            disabled={(!useDelay && !useSearchDelay) || useCustomCommands}
            >
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="auto" id="delay-auto" />
                    <Label htmlFor="delay-auto">{t.auto}</Label>
                </div>
                <div className="flex items-center gap-3">
                    <RadioGroupItem value="custom" id="delay-custom" />
                    <Label htmlFor="delay-custom">{t.custom}</Label>
                </div>
            </RadioGroup>
            <div className="flex flex-col gap-2 mt-5">
                <Label className="text-xs mb-1">{t.minMaxSleepInterval}</Label>
                <Form {...minMaxSleepIntervalForm}>
                    <form onSubmit={minMaxSleepIntervalForm.handleSubmit(handleMinMaxSleepIntervalSubmit)} className="flex gap-4 w-full" autoComplete="off">
                        <FormField
                            control={minMaxSleepIntervalForm.control}
                            name="min_sleep_interval"
                            disabled={delayMode !== "custom" || (!useDelay && !useSearchDelay)}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <NumberInput
                                        className="w-full"
                                        placeholder={t.minSleep}
                                        min={0}
                                        readOnly={useCustomCommands}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={minMaxSleepIntervalForm.control}
                            name="max_sleep_interval"
                            disabled={delayMode !== "custom" || (!useDelay && !useSearchDelay)}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <NumberInput
                                        className="w-full"
                                        placeholder={t.maxSleep}
                                        min={0}
                                        readOnly={useCustomCommands}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={(!watchedMinSleepInterval || Number(watchedMinSleepInterval) === minSleepInterval) && (!watchedMaxSleepInterval || Number(watchedMaxSleepInterval) === maxSleepInterval) || Object.keys(minMaxSleepIntervalFormErrors).length > 0 || delayMode !== "custom" || (!useDelay && !useSearchDelay)}
                        >
                            {t.save}
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex flex-col gap-2 mt-4 mb-2">
                <Label className="text-xs mb-1">{t.requestSleepInterval} ({t.inSeconds})</Label>
                <Form {...requestSleepIntervalForm}>
                    <form onSubmit={requestSleepIntervalForm.handleSubmit(handleRequestSleepIntervalSubmit)} className="flex gap-4 w-full" autoComplete="off">
                        <FormField
                            control={requestSleepIntervalForm.control}
                            name="request_sleep_interval"
                            disabled={delayMode !== "custom" || (!useDelay && !useSearchDelay)}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <NumberInput
                                        className="w-full"
                                        placeholder={t.requestSleep}
                                        min={0}
                                        readOnly={useCustomCommands}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!watchedRequestSleepInterval || Number(watchedRequestSleepInterval) === requestSleepInterval || Object.keys(requestSleepIntervalFormErrors).length > 0 || delayMode !== "custom" || (!useDelay && !useSearchDelay)}
                        >
                            {t.save}
                        </Button>
                    </form>
                </Form>
            </div>
            <Label className="text-xs text-muted-foreground">({t.configured}: {minSleepInterval}s - {maxSleepInterval}s & {requestSleepInterval}s, {t.mode}: {delayMode === 'auto' ? t.auto : t.custom}, {t.status}: {useDelay && delayPlaylistOnly ? t.playlistOnly : useDelay ? t.downloads : ''}{useDelay && useSearchDelay ? `, ${t.search}` : useSearchDelay ? t.search : !useDelay && !useSearchDelay ? t.disabled : ''}) ({t.default}: 10s - 20s & 1s, {t.range}: 1s - 3600s)</Label>
        </div>
        <div className="delay-playlist-only">
            <h3 className="font-semibold">{t.delayPlaylistOnly}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.delayPlaylistOnlyDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="delay-playlist-only"
                checked={delayPlaylistOnly}
                onCheckedChange={(checked) => saveSettingsKey('delay_playlist_only', checked)}
                disabled={!useDelay || useCustomCommands}
                />
            </div>
        </div>
        </>
    );
}

function AppPoTokenSettings() {
    // const isFlatpak = useEnvironmentStore(state => state.isFlatpak);
    const { t } = useI18n();

    const formResetTrigger = useSettingsPageStatesStore(state => state.formResetTrigger);
    const acknowledgeFormReset = useSettingsPageStatesStore(state => state.acknowledgeFormReset);

    const usePotoken = useSettingsPageStatesStore(state => state.settings.use_potoken);
    const disableInnertube = useSettingsPageStatesStore(state => state.settings.disable_innertube);
    const potServerPort = useSettingsPageStatesStore(state => state.settings.pot_server_port);
    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);
    const isRunningPotServer = useSettingsPageStatesStore(state => state.isRunningPotServer);
    const isStartingPotServer = useSettingsPageStatesStore(state => state.isStartingPotServer);
    const isChangingPotServerPort = useSettingsPageStatesStore(state => state.isChangingPotServerPort);
    const setIsChangingPotServerPort = useSettingsPageStatesStore(state => state.setIsChangingPotServerPort);

    const { saveSettingsKey } = useSettings();
    const { startPotServer, stopPotServer } = usePotServer();

    const potServerPortForm = useForm<z.infer<typeof potServerPortSchema>>({
        resolver: zodResolver(potServerPortSchema),
        defaultValues: {
            port: potServerPort,
        },
        mode: "onChange",
    });
    const watchedPotServerPort = potServerPortForm.watch("port");
    const { errors: potServerPortFormErrors } = potServerPortForm.formState;

    async function handlePotServerPortSubmit(values: z.infer<typeof potServerPortSchema>) {
        setIsChangingPotServerPort(true);
        try {
            saveSettingsKey('pot_server_port', values.port);
            if (isRunningPotServer) {
                await stopPotServer();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await startPotServer(values.port);
            }
            toast.success(t.potServerPortUpdated, {
                description: `${t.potServerPortUpdatedDesc}${values.port}`,
            });
        } catch (error) {
            console.error("Error changing PO Token Server Port:", error);
            toast.error(t.potServerPortUpdateFailed, {
                description: t.potServerPortUpdateFailedDesc,
            });
        } finally {
            setIsChangingPotServerPort(false);
        }
    }

    useEffect(() => {
        if (formResetTrigger > 0) {
            potServerPortForm.reset();
            acknowledgeFormReset();
        }
    }, [formResetTrigger]);

    return (
        <>
        <div className="potoken">
            <h3 className="font-semibold">{t.potTokenSettings}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.potTokenDesc}</p>
            <div className="flex items-center space-x-2 mb-2">
                <Switch
                id="use-potoken"
                checked={usePotoken}
                onCheckedChange={async (checked) => {
                    saveSettingsKey('use_potoken', checked);
                    if (checked) {
                        await startPotServer();
                    } else {
                        await stopPotServer();
                    }
                }}
                disabled={useCustomCommands || isStartingPotServer || isChangingPotServerPort /*|| isFlatpak*/}
                />
                <Label htmlFor="use-potoken">{t.usePotToken}</Label>
            </div>
            <Label className="text-xs text-muted-foreground flex items-center">
                <span className="mr-1">NeoDLP POT Server is</span>
                {isStartingPotServer ? (
                    <span className="text-amber-600 dark:text-amber-500 underline">Starting</span>
                ) : isRunningPotServer ? (
                    <span className="text-emerald-600 dark:text-emerald-500 underline">Running</span>
                ) : (
                    <span className="text-red-600 dark:text-red-500 underline">Not Running</span>
                )}
                {isRunningPotServer && potServerPort ? (
                    <span className="ml-1">on Port {potServerPort}</span>
                ) : null}
            </Label>
        </div>
        <div className="disable-innertube">
            <h3 className="font-semibold">{t.disableInnertube}</h3>
            <p className="text-xs text-muted-foreground mb-3">Disable the usage of innertube api for potoken generation (falls back to legacy mode, use only if normal potoken is not working)</p>
            <div className="flex items-center space-x-2">
                <Switch
                id="disable-innertube"
                checked={disableInnertube}
                onCheckedChange={(checked) => saveSettingsKey('disable_innertube', checked)}
                disabled={useCustomCommands || !usePotoken /*|| isFlatpak*/}
                />
            </div>
        </div>
        <div className="pot-server-port">
            <h3 className="font-semibold">POT Server Port</h3>
            <p className="text-xs text-muted-foreground mb-3">Change neodlp proof-of-origin token server port</p>
            <div className="flex flex-col gap-2">
                <Form {...potServerPortForm}>
                    <form onSubmit={potServerPortForm.handleSubmit(handlePotServerPortSubmit)} className="flex gap-4 w-full" autoComplete="off">
                        <FormField
                            control={potServerPortForm.control}
                            name="port"
                            disabled={!usePotoken || isChangingPotServerPort || isStartingPotServer /*|| isFlatpak*/}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <NumberInput
                                        className="w-full"
                                        placeholder={t.enterPortNumber}
                                        min={0}
                                        readOnly={useCustomCommands}
                                        {...field}
                                        />
                                    </FormControl>
                                    <Label htmlFor="port" className="text-xs text-muted-foreground">({t.current}: {potServerPort}) ({t.default}: 4416, {t.range}: 4000-5000)</Label>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            disabled={!watchedPotServerPort || Number(watchedPotServerPort) === potServerPort || Object.keys(potServerPortFormErrors).length > 0 || !usePotoken || useCustomCommands || isChangingPotServerPort || isStartingPotServer /*|| isFlatpak*/}
                        >
                            {isChangingPotServerPort ? (
                                <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t.changing}
                                </>
                            ) : (
                                t.save
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
        </>
    );
}

function AppNotificationSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const isFlatpak = useEnvironmentStore(state => state.isFlatpak);

    const enableNotifications = useSettingsPageStatesStore(state => state.settings.enable_notifications);
    const updateNotification = useSettingsPageStatesStore(state => state.settings.update_notification);
    const downloadCompletionNotification = useSettingsPageStatesStore(state => state.settings.download_completion_notification);

    return (
        <>
        <div className="notifications">
            <h3 className="font-semibold">{t.notifications}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.notificationsDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="enable-notifications"
                checked={enableNotifications}
                disabled={isFlatpak}
                onCheckedChange={async (checked) => {
                    if (checked) {
                        const granted = await isPermissionGranted();
                        if (!granted) {
                            const permission = await requestPermission();
                            if (permission !== 'granted') {
                                toast.error(t.notificationPermissionDenied, {
                                    description: t.notificationPermissionDeniedDesc,
                                });
                                return;
                            }
                        }
                    }
                    saveSettingsKey('enable_notifications', checked)
                }}
                />
                <Label htmlFor="enable-notifications">{t.enableNotifications}</Label>
            </div>
            <div className="flex flex-col gap-2 mt-5">
                <Label className="text-xs mb-1">{t.notificationCategories}</Label>
                <div className="flex items-center space-x-2 mb-1">
                    <Switch
                    id="update-notification"
                    checked={updateNotification}
                    onCheckedChange={(checked) => saveSettingsKey('update_notification', checked)}
                    disabled={!enableNotifications || isFlatpak}
                    />
                    <Label htmlFor="update-notification">{t.appUpdates}</Label>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                    <Switch
                    id="download-completion-notification"
                    checked={downloadCompletionNotification}
                    onCheckedChange={(checked) => saveSettingsKey('download_completion_notification', checked)}
                    disabled={!enableNotifications || isFlatpak}
                    />
                    <Label htmlFor="download-completion-notification">{t.downloadCompletion}</Label>
                </div>
            </div>
        </div>
        </>
    );
}

function AppCommandSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();
    const { startPotServer, stopPotServer } = usePotServer();

    const formResetTrigger = useSettingsPageStatesStore(state => state.formResetTrigger);
    const acknowledgeFormReset = useSettingsPageStatesStore(state => state.acknowledgeFormReset);

    const useCustomCommands = useSettingsPageStatesStore(state => state.settings.use_custom_commands);
    const customCommands = useSettingsPageStatesStore(state => state.settings.custom_commands);
    const usePotoken = useSettingsPageStatesStore(state => state.settings.use_potoken);

    const setDownloadConfigurationKey = useDownloaderPageStatesStore((state) => state.setDownloadConfigurationKey);
    const resetDownloadConfiguration = useDownloaderPageStatesStore((state) => state.resetDownloadConfiguration);

    const addCustomCommandForm = useForm<z.infer<typeof addCustomCommandSchema>>({
        resolver: zodResolver(addCustomCommandSchema),
        defaultValues: {
            label: '',
            args: '',
        },
        mode: "onChange",
    });
    const watchedLabel = addCustomCommandForm.watch("label");
    const watchedArgs = addCustomCommandForm.watch("args");
    const { errors: addCustomCommandFormErrors } = addCustomCommandForm.formState;

    function handleAddCustomCommandSubmit(values: z.infer<typeof addCustomCommandSchema>) {
        try {
            const newCommand = {
                id: generateID(),
                label: values.label,
                args: values.args,
            };
            const updatedCommands = [...customCommands, newCommand];
            saveSettingsKey('custom_commands', updatedCommands);
            toast.success(t.customCommandAdded, {
                description: `${t.customCommandAddedDesc}"${values.label}" added.`,
            });
            addCustomCommandForm.reset();
        } catch (error) {
            console.error("Error adding custom command:", error);
            toast.error(t.customCommandAddFailed, {
                description: t.customCommandAddFailedDesc,
            });
        }
    }

    function handleRemoveCustomCommandSubmit(commandId: string) {
        try {
            const removedCommand = customCommands.find(command => command.id === commandId);
            const updatedCommands = customCommands.filter(command => command.id !== commandId);
            saveSettingsKey('custom_commands', updatedCommands);
            setDownloadConfigurationKey('custom_command', null);
            toast.success(t.customCommandRemoved, {
                description: t.customCommandRemovedDesc,
            });
        } catch (error) {
            console.error("Error removing custom command:", error);
            toast.error(t.customCommandRemoveFailed, {
                description: t.customCommandRemoveFailedDesc,
            });
        }
    }

    useEffect(() => {
        if (formResetTrigger > 0) {
            addCustomCommandForm.reset();
            acknowledgeFormReset();
        }
    }, [formResetTrigger]);

    return (
        <>
        <div className="custom-commands">
            <h3 className="font-semibold">{t.customCommands}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.customCommandsDesc}</p>
            <Alert className="mb-3">
                <TriangleAlert className="size-4 stroke-primary" />
                <AlertTitle className="text-sm">{t.mostSettingsDisabled}</AlertTitle>
                <AlertDescription className="text-xs">
                    {t.customCommandsWarning}
                </AlertDescription>
            </Alert>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="use-custom-commands"
                checked={useCustomCommands}
                onCheckedChange={async(checked) => {
                    saveSettingsKey('use_custom_commands', checked)
                    resetDownloadConfiguration();
                    if (checked && usePotoken) {
                        await stopPotServer();
                    } else if (!checked && usePotoken) {
                        await startPotServer();
                    }
                }}
                />
                <Label htmlFor="use-custom-commands">{t.useCustomCommands}</Label>
            </div>
            <div className="flex flex-col gap-2">
                <Form {...addCustomCommandForm}>
                    <form onSubmit={addCustomCommandForm.handleSubmit(handleAddCustomCommandSubmit)} className="flex flex-col gap-3" autoComplete="off">
                        <FormField
                            control={addCustomCommandForm.control}
                            name="args"
                            disabled={!useCustomCommands}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Textarea
                                        className="focus-visible:ring-0 min-h-26"
                                        placeholder={t.customCommandsPlaceholder}
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 w-full">
                            <FormField
                                control={addCustomCommandForm.control}
                                name="label"
                                disabled={!useCustomCommands}
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormControl>
                                            <Input
                                            className="focus-visible:ring-0"
                                            placeholder={t.labelPlaceholder}
                                            {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={!watchedLabel || !watchedArgs || Object.keys(addCustomCommandFormErrors).length > 0 || !useCustomCommands}
                            >
                                {t.addCustomCommandBtn}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div className="flex-flex-col gap-2 mt-4">
                <Label className="text-xs mb-3">{t.customCommandTemplates}</Label>
                {customCommands.length === 0 ? (
                    <p className="text-sm text-muted-foreground">{t.noCustomCommands}</p>
                ) : (
                    <div className="flex flex-col gap-3 w-full mt-2">
                        {customCommands.map((command) => (
                            <div key={command.id} className="p-2 flex justify-between gap-2 border border-border rounded-md">
                                <div className="flex flex-col">
                                    <h5 className="text-sm mb-1">{command.label}</h5>
                                    <p className="text-xs font-mono text-muted-foreground">{command.args}</p>
                                </div>
                                <div className="flex">
                                    <Button
                                    variant="destructive"
                                    size="icon"
                                    disabled={!useCustomCommands}
                                    onClick={() => {
                                        handleRemoveCustomCommandSubmit(command.id);
                                    }}
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

function AppDebugSettings() {
    const { saveSettingsKey } = useSettings();
    const { t } = useI18n();

    const debugMode = useSettingsPageStatesStore(state => state.settings.debug_mode);
    const logVerbose = useSettingsPageStatesStore(state => state.settings.log_verbose);
    const logProgress = useSettingsPageStatesStore(state => state.settings.log_progress);

    return (
        <>
        <div className="debug-mode">
            <h3 className="font-semibold">{t.debugSettings}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.debugSettingsDesc}</p>
            <div className="flex items-center space-x-2 mb-4">
                <Switch
                id="debug-mode"
                checked={debugMode}
                onCheckedChange={(checked) => saveSettingsKey('debug_mode', checked)}
                />
                <Label htmlFor="debug-mode">{t.enableDebugMode}</Label>
            </div>
            <div className="flex flex-col gap-2 mt-5">
                <Label className="text-xs mb-1">{t.loggingOptions}</Label>
                <div className="flex items-center space-x-2 mb-1">
                    <Switch
                    id="log-verbose"
                    checked={logVerbose}
                    onCheckedChange={(checked) => saveSettingsKey('log_verbose', checked)}
                    disabled={!debugMode}
                    />
                    <Label htmlFor="log-verbose">{t.verboseLogging}</Label>
                </div>
                <div className="flex items-center space-x-2 mb-1">
                    <Switch
                    id="log-progress"
                    checked={logProgress}
                    onCheckedChange={(checked) => saveSettingsKey('log_progress', checked)}
                    disabled={!debugMode}
                    />
                    <Label htmlFor="log-progress">{t.logProgress}</Label>
                </div>
            </div>
        </div>
        </>
    );
}

function AppInfoSettings() {
    const { t } = useI18n();
    const isFlatpak = useEnvironmentStore(state => state.isFlatpak);
    const isAppimage = useEnvironmentStore(state => state.isAppimage);

    const appVersion = useSettingsPageStatesStore(state => state.appVersion);

    const binDepsList = [
        { key: 'yt-dlp', name: 'YT-DLP', desc: 'The core video/audio downloading engine', url: 'https://github.com/yt-dlp/yt-dlp', license: 'Unlicense', licenseUrl: 'https://github.com/yt-dlp/yt-dlp/blob/master/LICENSE' },
        { key: 'ffmpeg', name: 'FFmpeg', desc: 'Multimedia framework for handling video/audio processing', url: 'https://ffmpeg.org/', license: 'LGPLv2.1+', licenseUrl: 'https://ffmpeg.org/legal.html' },
        { key: 'ffprobe', name: 'FFprobe', desc: 'Multimedia stream analyzer for retrieving media information', url: 'https://ffmpeg.org/ffprobe.html', license: 'LGPLv2.1+', licenseUrl: 'https://ffmpeg.org/legal.html' },
        { key: 'deno', name: 'Deno', desc: 'The modern JavaScript/TypeScript runtime', url: 'https://deno.land/', license: 'MIT', licenseUrl: 'https://github.com/denoland/deno/blob/main/LICENSE.md' },
        { key: 'aria2', name: 'Aria2', desc: 'Lightweight multi-protocol & multi-source download utility', url: 'https://aria2.github.io/', license: 'GPLv2+', licenseUrl: 'https://github.com/aria2/aria2/blob/master/COPYING' },
        { Key: 'bgutil-pot-rs', name: 'BgUtils POT Provider (Rust)', desc: 'A high-performance YouTube POT (Proof-of-Origin Token) provider implemented in Rust', url: 'https://github.com/jim60105/bgutil-ytdlp-pot-provider-rs', license: 'GPLv3+', licenseUrl: 'https://github.com/jim60105/bgutil-ytdlp-pot-provider-rs/blob/master/LICENSE' },
    ];
    const langDepsList = [
        { key: 'tauri', name: 'Tauri', desc: 'Framework for building cross-platform, tiny and blazing fast binaries', url: 'https://tauri.app/', license: 'MIT, Apache-2.0', licenseUrl: 'https://github.com/tauri-apps/tauri/blob/dev/LICENSE_MIT' },
        { key: 'react', name: 'React', desc: 'The library for web and native user interfaces', url: 'https://reactjs.org/', license: 'MIT', licenseUrl: 'https://github.com/facebook/react/blob/main/LICENSE' },
        { key: 'rust', name: 'Rust', desc: 'A language empowering everyone to build reliable and efficient software', url: 'https://www.rust-lang.org/', license: 'MIT, Apache-2.0', licenseUrl: 'https://github.com/rust-lang/rust/blob/main/LICENSE-APACHE' },
        { key: 'typescript', name: 'TypeScript', desc: 'Typed superset of JavaScript that compiles to plain JavaScript', url: 'https://www.typescriptlang.org/', license: 'Apache-2.0', licenseUrl: 'https://github.com/microsoft/TypeScript/blob/main/LICENSE.txt' },
        { key: 'tailwindcss', name: 'Tailwind CSS', desc: 'A utility-first CSS framework for rapidly building custom designs', url: 'https://tailwindcss.com/', license: 'MIT', licenseUrl: 'https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE' },
        { key: 'vite', name: 'Vite', desc: 'Next Generation Frontend Tooling', url: 'https://vitejs.dev/', license: 'MIT', licenseUrl: 'https://github.com/vitejs/vite/blob/main/LICENSE' },
        { key: 'sqlite3', name: 'SQLite3', desc: 'A C library that implements a small, fast, self-contained SQL database engine', url: 'https://www.sqlite.org/', license: 'Public', licenseUrl: 'https://www.sqlite.org/copyright.html' },
    ];
    const libDepsList = [
        { key: 'shadcn-ui', name: 'shadcn/ui', desc: 'Beautifully designed components built with Radix UI and Tailwind CSS', url: 'https://ui.shadcn.com/', license: 'MIT', licenseUrl: 'https://github.com/shadcn-ui/ui/blob/main/LICENSE.md' },
        { key: 'lucide-icons', name: 'Lucide Icons', desc: 'A simple and consistent icon system for web applications', url: 'https://lucide.dev/', license: 'ISC', licenseUrl: 'https://github.com/lucide-icons/lucide/blob/main/LICENSE' },
        { key: 'tanstack-react-query', name: 'TanStack React Query', desc: 'Powerful asynchronous state management, server-state utilities and data fetching', url: 'https://tanstack.com/query/latest', license: 'MIT', licenseUrl: 'https://github.com/TanStack/query/blob/main/LICENSE' },
        { key: 'tanstack-react-pacer' , name: 'TanStack React Pacer', desc: 'Framework agnostic debouncing, throttling, rate limiting, queuing, and batching utilities', url: 'https://tanstack.com/pacer/latest', license: 'MIT', licenseUrl: 'https://github.com/TanStack/pacer/blob/main/LICENSE' },
        { key: 'zustand', name: 'Zustand', desc: 'A small, fast and scalable bearbones state-management solution', url: 'https://zustand-demo.pmnd.rs/', license: 'MIT', licenseUrl: 'https://github.com/pmndrs/zustand/blob/main/LICENSE' },
        { key: 'zod', name: 'Zod', desc: 'TypeScript-first schema declaration and validation library', url: 'https://zod.dev/', license: 'MIT', licenseUrl: 'https://github.com/colinhacks/zod/blob/main/LICENSE' },
        { key: 'react-router', name: 'React Router', desc: 'Declarative routing for React applications', url: 'https://reactrouter.com/', license: 'MIT', licenseUrl: 'https://github.com/remix-run/react-router/blob/main/LICENSE.md' },
        { key: 'react-hook-form', name: 'React Hook Form', desc: 'Performant, flexible and extensible forms with easy-to-use validation', url: 'https://react-hook-form.com/', license: 'MIT', licenseUrl: 'https://github.com/react-hook-form/react-hook-form/blob/master/LICENSE' },
        { key: 'sonner', name: 'Sonner', desc: 'A beautiful, simple and customizable notification library for React', url: 'https://sonner.emilkowal.ski/', license: 'MIT', licenseUrl: 'https://github.com/emilkowalski/sonner/blob/main/LICENSE.md' },
        { key: 'tokio', name: 'Tokio', desc: 'An asynchronous runtime for the Rust programming language', url: 'https://tokio.rs/', license: 'MIT', licenseUrl: 'https://github.com/tokio-rs/tokio/blob/master/LICENSE' },
        { key: 'reqwest', name: 'Reqwest', desc: 'An easy and powerful HTTP Client for Rust', url: 'https://crates.io/crates/reqwest', license: 'MIT, Apache-2.0', licenseUrl: 'https://github.com/seanmonstar/reqwest/blob/master/LICENSE-APACHE' },
        { key: 'serde', name: 'Serde', desc: 'A framework for serializing and deserializing Rust data structures', url: 'https://serde.rs/', license: 'MIT, Apache-2.0', licenseUrl: 'https://github.com/serde-rs/serde/blob/master/LICENSE-MIT' },
        { key: 'sqlx', name: 'SQLx', desc: 'An async, pure Rust SQL crate', url: 'https://crates.io/crates/sqlx', license: 'MIT, Apache-2.0', licenseUrl: 'https://github.com/launchbadge/sqlx/blob/main/LICENSE-APACHE' },
        { key: 'directories', name: 'Directories', desc: 'A Rust library for platform-specific standard locations', url: 'https://crates.io/crates/directories', license: 'MIT, Apache-2.0', licenseUrl: 'https://codeberg.org/dirs/directories-rs/src/branch/main/LICENSE-APACHE' },
    ];

    function DependencyItem(dep: { name: string; desc: string; url: string; license: string; licenseUrl: string }) {
        return (
            <div className="p-4 border border-border rounded-md flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <h4 className="font-semibold flex items-center gap-2">
                        <a href={dep.url} target="_blank" className="hover:underline">
                            {dep.name}
                        </a>
                        <a href={dep.url} target="_blank" title={`${dep.name} homepage`}>
                            <ExternalLink className="size-3 text-muted-foreground hover:text-foreground" />
                        </a>
                    </h4>
                    <p className="text-xs text-muted-foreground">{dep.desc}</p>
                </div>
                <a href={dep.licenseUrl} target="_blank">
                    <Badge className="border-input rounded-full" variant="outline"><span className="mb-0.5">{dep.license}</span></Badge>
                </a>
            </div>
        );
    }

    return (
        <>
        <div className="app-info">
            <Card className="p-4 space-y-4 flex items-center gap-4">
                <div className="flex aspect-square size-18 items-center justify-center rounded-lg m-0">
                    <NeoDlpLogo className="size-full rounded-lg border border-border [--logo-stop-color-1:#4444FF] [--logo-stop-color-2:#FF43D0] customscheme:[--logo-stop-color-1:var(--color-chart-5)] customscheme:[--logo-stop-color-2:var(--color-chart-1)]" />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="truncate font-semibold">{config.appName} <Badge className="ml-1 border-primary px-1.5" variant="outline"><span className="mb-0.5">v{appVersion}</span></Badge></span>
                  <span className="truncate text-xs text-muted-foreground">The Next-Gen Truly Cross-Platform Video/Audio Downloader</span>
                  <span className="flex items-center gap-2">
                    <a href={config.appHomepage} target="_blank" className="text-sm text-foreground" title="Homepage">
                        <Globe className="size-3.5" />
                    </a>
                    <a href={'https://github.com/' + config.appRepo} target="_blank" className="text-sm text-foreground" title="GitHub">
                        <HugeiconsIcon icon={GithubIcon} className="size-3.5" />
                    </a>
                    <p className="text-muted-foreground">•</p>
                    <a href={config.appHomepage + '/privacy-policy'} target="_blank" className="text-xs hover:underline">Privacy Policy</a>
                    <p className="text-muted-foreground">•</p>
                    <a href={config.appHomepage + '/terms-of-use'} target="_blank" className="text-xs hover:underline">Terms of Use</a>
                  </span>
                </div>
            </Card>
        </div>
        <div className="about-developer">
            <h3 className="font-semibold">Developer</h3>
            <p className="text-xs text-muted-foreground mb-3">Meet the Creator of NeoDLP</p>
            <Card className="p-4 space-y-4 flex items-center gap-4">
                <div className="relative w-fit m-0">
                    <Avatar className="size-11">
                        <AvatarImage src={neosubhamoyImage} />
                        <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                    <span className='absolute -bottom-1 -right-1.5'>
                        <span className='sr-only'>{t.verified}</span>
                        <BadgeCheck className='text-background size-5 fill-primary' />
                    </span>
                </div>
                <div className="flex flex-col justify-center gap-1 m-0">
                    <span className="truncate font-semibold">{config.appAuthor}</span>
                    <p className="text-xs text-muted-foreground">{t.fullStackDeveloper}</p>
                </div>
                <div className="spacer grow"></div>
                <Button variant="ghost" size="icon" className="p-5 m-0 border border-input" title="Official Website" asChild>
                    <a href={config.appAuthorUrl} target="_blank">
                        <Globe className="size-4" />
                    </a>
                </Button>
                <Button className="py-5" title="Buy Me a Coffee" asChild>
                    <a href={config.appAuthorSponsorUrl} target="_blank">
                        <Heart className="size-4" /> {t.sponsor}
                    </a>
                </Button>
            </Card>
        </div>
        <div className="healthcheck">
            <h3 className="font-semibold">{t.healthCheck}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.healthCheckDesc}</p>
            {isFlatpak ? (
                <Alert className="">
                    <TriangleAlert className="size-4 stroke-primary" />
                    <AlertTitle className="text-sm">{t.flatpakSandboxDetected}</AlertTitle>
                    <AlertDescription className="text-xs">{t.flatpakSandboxDesc}</AlertDescription>
                </Alert>
            ) : isAppimage ? (
                <Alert className="">
                    <TriangleAlert className="size-4 stroke-primary" />
                    <AlertTitle className="text-sm">{t.appImageEnvDetected}</AlertTitle>
                    <AlertDescription className="text-xs">{t.appImageEnvDesc}</AlertDescription>
                </Alert>
            ) : (
                <Alert className="">
                    <CircleCheck className="size-4 stroke-primary" />
                    <AlertTitle className="text-sm">{t.allSet}</AlertTitle>
                    <AlertDescription className="text-xs">{t.allSetDesc}</AlertDescription>
                </Alert>
            )}
        </div>
        <div className="bug-report">
            <h3 className="font-semibold">{t.bugReport}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.bugReportDesc}</p>
            <div className="report">
                <span className="flex items-center gap-4 flex-wrap">
                    <Button className="px-4" variant="outline" size="sm" asChild>
                        <a href={'mailto:' + config.appSupportEmail + '?subject=[BUG]%20Title%20Here&body=Describe%20The%20Bug%20Here.%20Follow%20this%20issue%20template%3A%20https%3A%2F%2Fgithub.com%2Fneosubhamoy%2Fneodlp%2Fissues%2Fnew%3Ftemplate%3Dbug_report.md'} target="_blank" >
                            <Mail className="size-4" /> {t.writeAnEmail}
                        </a>
                    </Button>
                    <Button className="px-4" size="sm" asChild>
                        <a href={'https://github.com/' + config.appRepo + '/issues/new?template=bug_report.md'} target="_blank" >
                            <Bug className="size-4" /> {t.createAGitHubIssue}
                        </a>
                    </Button>
                </span>
            </div>
        </div>
        <div className="license-and-usage">
            <h3 className="font-semibold">{t.licenseAndUsage}</h3>
            <p className="text-xs text-muted-foreground mb-3">{t.licenseAndUsageDesc}</p>
            <div className="license">
                <p className="text-sm mb-3">{t.neoDlpIsFullyOpenSource}</p>
                <p className="text-sm mb-3"><TriangleAlert className="size-4 stroke-primary inline mb-1 mr-0.5" /> {t.disclaimer}</p>
                <span className="flex items-center gap-4 flex-wrap">
                    <Button className="px-4" variant="outline" size="sm" asChild>
                        <a href={'https://github.com/' + config.appRepo + '/blob/main/LICENSE'} target="_blank" >
                            <Scale className="size-4" /> {t.mitLicense}
                        </a>
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Package className="size-4" /> {t.dependencies}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-150">
                            <DialogHeader>
                                <DialogTitle>Dependencies</DialogTitle>
                                <DialogDescription>Major dependencies of NeoDLP</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 max-h-[45vh] overflow-y-auto">
                                <h4 className="text-sm font-semibold">{t.externalBinaries}</h4>
                                {binDepsList.map(({key, ...dep}) => (
                                    <DependencyItem key={key} {...dep} />
                                ))}
                                <h4 className="text-sm font-semibold">{t.languagesFrameworksTooling}</h4>
                                {langDepsList.map(({key, ...dep}) => (
                                    <DependencyItem key={key} {...dep} />
                                ))}
                                <h4 className="text-sm font-semibold">{t.notableLibraries}</h4>
                                {libDepsList.map(({key, ...dep}) => (
                                    <DependencyItem key={key} {...dep} />
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button size="sm" className="px-4" asChild>
                        <a href="https://github.com/yt-dlp/yt-dlp/blob/master/supportedsites.md" target="_blank" >
                            <ExternalLink className="size-4" /> {t.supportedSites}
                        </a>
                    </Button>
                </span>
            </div>
        </div>
        </>
    );
}

export function ApplicationSettings() {
    // const isFlatpak = useEnvironmentStore(state => state.isFlatpak);
    const { t } = useI18n();

    const activeSubAppTab = useSettingsPageStatesStore(state => state.activeSubAppTab);
    const setActiveSubAppTab = useSettingsPageStatesStore(state => state.setActiveSubAppTab);

    const ytDlpVersion = useSettingsPageStatesStore(state => state.ytDlpVersion);
    const isFetchingYtDlpVersion = useSettingsPageStatesStore(state => state.isFetchingYtDlpVersion);
    const isUpdatingYtDlp = useSettingsPageStatesStore(state => state.isUpdatingYtDlp);
    const ytDlpUpdateChannel = useSettingsPageStatesStore(state => state.settings.ytdlp_update_channel);
    const ytDlpAutoUpdate = useSettingsPageStatesStore(state => state.settings.ytdlp_auto_update);

    const downloadStates = useDownloadStatesStore(state => state.downloadStates);
    const ongoingDownloads = downloadStates.filter(state =>
        ['starting', 'downloading', 'queued'].includes(state.download_status)
    );

    const { saveSettingsKey } = useSettings();
    const { updateYtDlp } = useYtDlpUpdater();

    const tabsList = [
        { key: 'general', label: t.general, icon: Wrench, component: <AppGeneralSettings /> },
        { key: 'appearance', label: t.appearance, icon: WandSparkles, component: <AppAppearanceSettings /> },
        { key: 'filesystem', label: t.filesystem, icon: Folder, component: <AppFilesystemSettings /> },
        { key: 'formats', label: t.format, icon: FileVideo, component: <AppFormatSettings /> },
        { key: 'embedding', label: t.embed, icon: FilePen, component: <AppEmbeddingSettings /> },
        { key: 'network', label: t.network, icon: Wifi, component: <AppNetworkSettings /> },
        { key: 'cookies', label: t.cookies, icon: Cookie, component: <AppCookiesSettings /> },
        { key: 'sponsorblock', label: t.sponsorblock, icon: ShieldMinus, component: <AppSponsorblockSettings /> },
        { key: 'delay', label: t.delay, icon: Timer, component: <AppDelaySettings /> },
        { key: 'potoken', label: t.potoken, icon: KeyRound, component: <AppPoTokenSettings /> },
        { key: 'notifications', label: t.notifications, icon: BellRing, component: <AppNotificationSettings /> },
        { key: 'commands', label: t.commands, icon: SquareTerminal, component: <AppCommandSettings /> },
        { key: 'debug', label: t.debug, icon: Bug, component: <AppDebugSettings /> },
        { key: 'info', label: t.info, icon: Info, component: <AppInfoSettings /> },
    ];

    return (
        <>
        <Card className="p-4 space-y-4 my-4">
            <div className="w-full flex gap-4 items-center justify-between">
                <div className="flex gap-4 items-center">
                    <div className="imgwrapper w-10 h-10 flex items-center justify-center bg-linear-65 from-[#FF43D0] to-[#4444FF] customscheme:from-chart-1 customscheme:to-chart-5 rounded-md overflow-hidden border border-border">
                        <Terminal className="size-5 text-white" />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="flex items-center gap-2">
                            <span>YT-DLP</span>
                            <a href="https://github.com/yt-dlp/yt-dlp" className="" title="yt-dlp homepage" target="_blank">
                                <ExternalLink className="size-3 text-muted-foreground hover:text-foreground" />
                            </a>
                        </h3>
                        <p className="text-xs text-muted-foreground">{t.version}: {isFetchingYtDlpVersion ? 'Loading...' : ytDlpVersion ?? 'unknown'}</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <div className="flex items-center space-x-2">
                        <Switch
                        id="ytdlp-auto-update"
                        checked={ytDlpAutoUpdate}
                        // disabled={isFlatpak}
                        onCheckedChange={(checked) => saveSettingsKey('ytdlp_auto_update', checked)}
                        />
                        <Label htmlFor="ytdlp-auto-update">{t.autoUpdate}</Label>
                    </div>
                    <Select
                    value={ytDlpUpdateChannel}
                    // disabled={isFlatpak}
                    onValueChange={(value) => saveSettingsKey('ytdlp_update_channel', value)}
                    >
                        <SelectTrigger className="w-37.5 ring-0 focus:ring-0">
                            <SelectValue placeholder={t.selectUpdateChannel} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>{t.updateChannels}</SelectLabel>
                                <SelectItem value="stable">{t.stable}</SelectItem>
                                <SelectItem value="nightly">{t.nightly}</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                    disabled={ytDlpAutoUpdate || isUpdatingYtDlp || ongoingDownloads.length > 0 /*|| isFlatpak*/}
                    onClick={async () => await updateYtDlp()}
                    >
                        {isUpdatingYtDlp ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                {t.updating}
                            </>
                        ) : (
                            <>
                                {t.update}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </Card>
        <Tabs
        className="w-full flex flex-row items-start gap-4 mt-7"
        orientation="vertical"
        value={activeSubAppTab}
        onValueChange={setActiveSubAppTab}
        >
            <TabsList className="shrink-0 grid grid-cols-1 gap-1 p-0 bg-background min-w-45">
                {tabsList.map((tab) => (
                    <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground justify-start px-3 py-1.5 gap-2"
                    >
                        <tab.icon className="size-4" /> {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <div className="min-h-full flex flex-col w-full border-l border-border pl-4">
                {tabsList.map((tab) => (
                    <TabsContent key={tab.key} value={tab.key} className={clsx("flex flex-col gap-4 min-h-130", tab.key === "info" ? "max-w-[80%]" : "max-w-[70%]")}>
                        {tab.component}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
        </>
    );
}
