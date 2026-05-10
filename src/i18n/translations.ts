export type Language = 'en' | 'zh-CN';

export interface Translation {
  // Navigation
  downloader: string;
  library: string;
  settings: string;
  
  // Toast Messages
  tempDownloadsCleaned: string;
  tempDownloadsCleanedDesc: string;
  tempDownloadsCleanupFailed: string;
  tempDownloadsCleanupFailedDesc: string;
  noTempDownloads: string;
  noTempDownloadsDesc: string;
  filenameTemplateUpdated: string;
  filenameTemplateUpdatedDesc: string;
  filenameTemplateUpdateFailed: string;
  filenameTemplateUpdateFailedDesc: string;
  proxyUrlUpdated: string;
  proxyUrlUpdatedDesc: string;
  proxyUrlUpdateFailed: string;
  proxyUrlUpdateFailedDesc: string;
  rateLimitUpdated: string;
  rateLimitUpdatedDesc: string;
  rateLimitUpdateFailed: string;
  rateLimitUpdateFailedDesc: string;
  potServerPortUpdated: string;
  potServerPortUpdatedDesc: string;
  potServerPortUpdateFailed: string;
  potServerPortUpdateFailedDesc: string;
  sleepIntervalsUpdated: string;
  sleepIntervalsUpdatedDesc: string;
  sleepIntervalsUpdateFailed: string;
  sleepIntervalsUpdateFailedDesc: string;
  notificationPermissionDenied: string;
  notificationPermissionDeniedDesc: string;
  customCommandAdded: string;
  customCommandAddedDesc: string;
  customCommandAddFailed: string;
  customCommandAddFailedDesc: string;
  customCommandRemoved: string;
  customCommandRemovedDesc: string;
  customCommandRemoveFailed: string;
  customCommandRemoveFailedDesc: string;
  
  // Placeholders
  selectDownloadDirectory: string;
  selectCookiesTextFile: string;
  minSleep: string;
  maxSleep: string;
  requestSleep: string;
  labelPlaceholder: string;
  argsPlaceholder: string;
  selectPortPlaceholder: string;
  selectUpdateChannel: string;
  
  // Buttons
  updating: string;
  updateNow: string;
  downloadNow: string;
  readChangelog: string;
  writeAnEmail: string;
  createGitHubIssue: string;
  mitLicense: string;
  dependencies: string;
  supportedSites: string;
  
  // Other UI
  updateAvailable: string;
  updateAvailableDesc: string;
  updateApp: string;
  updateAppDesc: string;
  updateDownloading: string;
  failedToSelectFolder: string;
  failedToSelectFolderDesc: string;
  failedToSelectCookiesFile: string;
  failedToSelectCookiesFileDesc: string;
  mostSettingsDisabled: string;
  customCommandsWarning: string;
  customCommandsPlaceholder: string;
  noCustomCommands: string;
  customCommandTemplates: string;
  // Library
  open: string;
  reveal: string;
  search: string;
  remove: string;
  removeFromLibrary: string;
  removeFromLibraryDesc: string;
  deleteDownloadedFile: string;
  cancel: string;
  noCompletedDownloads: string;
  noCompletedDownloadsDesc: string;
  spinUpNewDownload: string;
  noIncompleteDownloads: string;
  noIncompleteDownloadsDesc: string;
  // Downloader
  download: string;
  custom: string;
  subtitles: string;
  videoUrl: string;
  fetching: string;
  failedToFetch: string;
  tryAgain: string;
  advancedDownloadOptions: string;
  selectFormat: string;
  selectSubtitles: string;
  downloadInProgress: string;
  waitingToStart: string;
  playlist: string;
  // Library detailed
  revealingFile: string;
  revealingFileDesc: string;
  openingFile: string;
  openingFileDesc: string;
  failedToRevealFile: string;
  failedToRevealFileDesc: string;
  failedToOpenFile: string;
  failedToOpenFileDesc: string;
  fileUnavailable: string;
  fileUnavailableDesc: string;
  deletedFromDownloads: string;
  deletedFromDownloadsDesc: string;
  removedFromDownloads: string;
  removedFromDownloadsDesc: string;
  failedToDeleteDownload: string;
  failedToDeleteDownloadDesc: string;
  failedToRemoveDownload: string;
  failedToRemoveDownloadDesc: string;
  initiatingVideoSearch: string;
  initiatingPlaylistSearch: string;
  initiatingSearchDesc: string;
  failedToInitiateSearch: string;
  failedToInitiateSearchDesc: string;
  video: string;
  unknown: string;
  unknownPlaylist: string;
  unknownChannel: string;
  embeddedSubtitle: string;
  sponsorblockMarked: string;
  sponsorblockRemoved: string;
  multiaudio: string;
  // Incomplete downloads
  processing: string;
  errored: string;
  speed: string;
  resumedDownload: string;
  resumedDownloadDesc: string;
  failedToResumeDownload: string;
  failedToResumeDownloadDesc: string;
  resuming: string;
  resume: string;
  failedToRestartDownload: string;
  failedToRestartDownloadDesc: string;
  retrying: string;
  retry: string;
  pausedDownload: string;
  pausedDownloadDesc: string;
  failedToPauseDownload: string;
  failedToPauseDownloadDesc: string;
  pausing: string;
  pause: string;
  canceledDownload: string;
  canceledDownloadDesc: string;
  failedToCancelDownload: string;
  failedToCancelDownloadDesc: string;
  canceling: string;
  versionLoading: string;
  versionUnknown: string;
  selectBrowserToImportCookies: string;
  browsers: string;
  externalBinaries: string;
  languagesFrameworksTooling: string;
  notableLibraries: string;
  neoDlpIsFullyOpenSource: string;
  disclaimer: string;
  flatpakSandboxDetected: string;
  flatpakSandboxDesc: string;
  appImageEnvDetected: string;
  appImageEnvDesc: string;
  allSet: string;
  allSetDesc: string;
  healthCheck: string;
  healthCheckDesc: string;
  bugReport: string;
  bugReportDesc: string;
  licenseAndUsage: string;
  licenseAndUsageDesc: string;
  notifications: string;
  notificationsDesc: string;
  enableNotifications: string;
  notificationCategories: string;
  appUpdates: string;
  downloadCompletion: string;
  delaySettings: string;
  delayDesc: string;
  useDelayInDownloads: string;
  useDelayInSearch: string;
  delayPlaylistOnly: string;
  delayPlaylistOnlyDesc: string;
  minMaxSleepInterval: string;
  requestSleepIntervalSec: string;
  customCommands: string;
  customCommandsDesc: string;
  useCustomCommands: string;
  addCustomCommandBtn: string;
  debugSettings: string;
  debugSettingsDesc: string;
  enableDebugMode: string;
  loggingOptions: string;
  verboseLogging: string;
  logProgress: string;
  potTokenSettings: string;
  potTokenDesc: string;
  usePotToken: string;
  disableInnertube: string;
  potServerPort: string;
  aboutInfoSettings: string;
  neoDownloaderPlus: string;
  fullStackDeveloper: string;
  officialWebsite: string;
  buyMeACoffee: string;
  sponsor: string;
  verified: string;
  
  // Downloader
  videoDownloader: string;
  playlistDownloader: string;
  enterUrl: string;
  search: string;
  searching: string;
  download: string;
  downloading: string;
  paused: string;
  completed: string;
  failed: string;
  cancel: string;
  
  // Library
  completedDownloads: string;
  incompleteDownloads: string;
  noDownloads: string;
  noIncompleteDownloads: string;
  allCaughtUp: string;
  spinUpNewDownload: string;
  stop: string;
  
  // Settings - General
  general: string;
  appearance: string;
  filesystem: string;
  format: string;
  embed: string;
  network: string;
  cookies: string;
  sponsorblock: string;
  extension: string;
  
  maxParallelDownloads: string;
  setMaxParallelDownloads: string;
  preferVideoOverPlaylist: string;
  preferVideoOverPlaylistDesc: string;
  strictDownloadabilityCheck: string;
  strictDownloadabilityCheckDesc: string;
  maxRetries: string;
  setMaxRetries: string;
  aria2: string;
  aria2Desc: string;
  
  // Settings - Appearance
  theme: string;
  chooseAppTheme: string;
  light: string;
  dark: string;
  system: string;
  colorScheme: string;
  chooseAppColorScheme: string;
  default: string;
  blue: string;
  green: string;
  orange: string;
  red: string;
  rose: string;
  violet: string;
  yellow: string;
  
  // Settings - Filesystem
  downloadFolder: string;
  setDefaultDownloadFolder: string;
  temporaryDownloadFolder: string;
  cleanupTempDownloads: string;
  filenameTemplate: string;
  setFilenameTemplate: string;
  sanitizeFilenames: string;
  sanitizeFilenamesDesc: string;
  windowsCompatibility: string;
  forceAsciiOnly: string;
  browse: string;
  save: string;
  clean: string;
  
  // Settings - Format
  videoFormat: string;
  chooseVideoFormat: string;
  audioFormat: string;
  chooseAudioFormat: string;
  alwaysReencodeVideo: string;
  alwaysReencodeVideoDesc: string;
  auto: string;
  
  // Settings - Embed
  embedMetadata: string;
  embedMetadataDesc: string;
  embedThumbnail: string;
  embedThumbnailDesc: string;
  video: string;
  audio: string;
  
  // Settings - Network
  proxy: string;
  proxyDesc: string;
  useProxy: string;
  enterProxyUrl: string;
  proxyUrlRequired: string;
  invalidUrlFormat: string;
  configured: string;
  status: string;
  enabled: string;
  disabled: string;
  rateLimit: string;
  rateLimitDesc: string;
  useRateLimit: string;
  enterRateLimit: string;
  rateLimitRequired: string;
  rateLimitValidNumber: string;
  rateLimitInteger: string;
  rateLimitMin: string;
  rateLimitMax: string;
  forceInternetProtocol: string;
  forceInternetProtocolDesc: string;
  forceIpv: string;
  useIpv4Only: string;
  useIpv6Only: string;
  forced: string;
  
  // Settings - Cookies
  cookiesSettings: string;
  cookiesDesc: string;
  useCookies: string;
  importFromBrowser: string;
  importFromTextFile: string;
  importCookiesFromBrowser: string;
  selectBrowserToImport: string;
  firefoxRecommended: string;
  chrome: string;
  chromium: string;
  safari: string;
  brave: string;
  edge: string;
  opera: string;
  vivaldi: string;
  whale: string;
  importCookiesFromTextFile: string;
  selectCookiesTextFile: string;
  from: string;
  
  // Settings - Sponsorblock
  sponsorblockSettings: string;
  sponsorblockDesc: string;
  useSponsorblock: string;
  removeSegments: string;
  markSegments: string;
  sponsorblockRemoveCategories: string;
  sponsorblockMarkCategories: string;
  all: string;
  custom: string;
  sponsorship: string;
  intro: string;
  outro: string;
  interaction: string;
  selfPromotion: string;
  musicOfftopic: string;
  preview: string;
  filler: string;
  chapter: string;
  hook: string;
  pointOfInterest: string;
  
  // Common
  current: string;
  language: string;
  selectLanguage: string;
  english: string;
  simplifiedChinese: string;
  default: string;
  range: string;
  yes: string;
  no: string;
  mode: string;
  unknown: string;
  browsers: string;
  browser: string;
  text: string;
  
  // Additional settings page
  settingsTitle: string;
  settingsDescription: string;
  application: string;
  applicationTab: string;
  reset: string;
  autoUpdate: string;
  nightly: string;
  update: string;
  version: string;
  label: string;
  labelRequired: string;
  args: string;
  argsRequired: string;
  addCustomCommand: string;
  add: string;
  sleepInterval: string;
  requestSleepInterval: string;
  setMinSleepInterval: string;
  setMaxSleepInterval: string;
  minSleepInterval: string;
  maxSleepInterval: string;
  minSleepIntervalRequired: string;
  maxSleepIntervalRequired: string;
  minSleepIntervalValidNumber: string;
  maxSleepIntervalValidNumber: string;
  minSleepIntervalInteger: string;
  maxSleepIntervalInteger: string;
  minSleepIntervalMin: string;
  maxSleepIntervalMin: string;
  minSleepIntervalMax: string;
  maxSleepIntervalMax: string;
  extensionTab: string;

  // Downloader
  searchTitle: string;
  enterVideoPlaylistUrl: string;
  noResultsFound: string;
  noResultsFoundDesc: string;
  invalidUrl: string;
  invalidUrlDesc: string;
  searchInProgress: string;
  searchInProgressDesc: string;
  metadata: string;
  playlist: string;

  // Library
  libraryTitle: string;
  libraryDescription: string;
  stopAllOngoingDownloads: string;
  stopAllOngoingDownloadsDesc: string;
  failedToStopDownload: string;
  failedToStopDownloadDesc: string;
  stoppedOngoingDownloads: string;
  stoppedOngoingDownloadsDesc: string;
  noOngoingDownloads: string;
  noOngoingDownloadsDesc: string;
  extractedFrom: string;

  // Common validation
    urlRequired: string;
    
    // Additional UI text
    enterFilenameTemplate: string;
    temporaryDownloadDirectory: string;
    cleanUpAllTempDownloads: string;
    cleanUpAllTempDownloadsDesc: string;
    inSeconds: string;
    mode: string;
    auto: string;
    custom: string;
    status: string;
    playlistOnly: string;
    downloads: string;
    search: string;
    default: string;
    range: string;
    neoDlpPotServerIs: string;
    optionsUnavailable: string;
    optionsUnavailableDesc: string;
    outputFormat: string;
    video: string;
    audio: string;
    followSettings: string;
    items: string;
    errorInitiatingDownload: string;
    configurations: string;
    tweakDownloadConfigurations: string;
    options: string;
    commands: string;
    failedToStartDownload: string;
    startingDownload: string;
    startDownload: string;
    statusAuto: string;
    statusCombined: string;
    statusForced: string;
    statusUnknown: string;
    starting: string;
    running: string;
    notRunning: string;
    onPort: string;
    disableInnertubeDesc: string;
    potServerPort: string;
    potServerPortDesc: string;
    enterPortNumber: string;
    current: string;
    changing: string;
    selectUpdateChannel: string;
    updateChannels: string;
    stable: string;
    updating: string;
    websocketPortRequired: string;
    websocketPortValidNumber: string;
    websocketPortInteger: string;
    websocketPortMin: string;
    websocketPortMax: string;
    openingLink: string;
    openingLinkDesc: string;
    failedToOpenLink: string;
    failedToOpenLinkDesc: string;
    neoDlpExtension: string;
    integrateNeoDlpBrowser: string;
    getNow: string;
    getChromeExtension: string;
    fromChromeWebStore: string;
    getFirefoxExtension: string;
    fromMozillaAddonsStore: string;
    linkNote: string;
    websocketPort: string;
    changeExtensionWebsocketPort: string;
    websocketPortUpdated: string;
    websocketPortUpdatedDesc: string;
    failedToChangeWebsocketPort: string;
    failedToChangeWebsocketPortDesc: string;
    change: string;
    install: string;
    port: string;
    extensionWebsocketServer: string;
    restarting: string;
    running: string;
    websocketServerRestarted: string;
    websocketServerRestartedDesc: string;
    failedToRestartWebsocketServer: string;
    failedToRestartWebsocketServerDesc: string;
    restart: string;
  neoDownloaderPlus: string;
  loading: string;
  updateAvailableTooltip: string;
  expandSidebarToViewUpdate: string;
  updateAvailableTitle: string;
  updateAvailableVersion: string;
  aNewerVersionOfNeodlpAvailable: string;
  application: string;
  extension: string;
  resetSettingsToDefault: string;
  areYouSureResetSettings: string;
  logs: string;
  logViewer: string;
  monitorRealtimeAppLogs: string;
  noLogsToShow: string;
  clearLogs: string;
  copyLogs: string;
  potoken: string;
  notifications: string;
  commands: string;
  debug: string;
  info: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    downloader: 'Downloader',
    library: 'Library',
    settings: 'Settings',
    
    // Toast Messages
    tempDownloadsCleaned: 'Temporary Downloads Cleaned',
    tempDownloadsCleanedDesc: 'All temporary downloads have been successfully cleaned up.',
    tempDownloadsCleanupFailed: 'Temporary Downloads Cleanup Failed',
    tempDownloadsCleanupFailedDesc: 'An error occurred while trying to clean up temporary downloads. Please try again.',
    noTempDownloads: 'No Temporary Downloads',
    noTempDownloadsDesc: 'There are no temporary downloads to clean up.',
    filenameTemplateUpdated: 'Filename Template updated',
    filenameTemplateUpdatedDesc: 'Filename Template changed to ',
    filenameTemplateUpdateFailed: 'Failed to change filename template',
    filenameTemplateUpdateFailedDesc: 'An error occurred while trying to change the filename template. Please try again.',
    proxyUrlUpdated: 'Proxy URL updated',
    proxyUrlUpdatedDesc: 'Proxy URL changed to ',
    proxyUrlUpdateFailed: 'Failed to change proxy URL',
    proxyUrlUpdateFailedDesc: 'An error occurred while trying to change the proxy URL. Please try again.',
    rateLimitUpdated: 'Rate Limit updated',
    rateLimitUpdatedDesc: 'Rate Limit changed to ',
    rateLimitUpdateFailed: 'Failed to change rate limit',
    rateLimitUpdateFailedDesc: 'An error occurred while trying to change the rate limit. Please try again.',
    potServerPortUpdated: 'POT Server Port updated',
    potServerPortUpdatedDesc: 'PO Token Server Port changed to ',
    potServerPortUpdateFailed: 'Failed to change POT Server Port',
    potServerPortUpdateFailedDesc: 'An error occurred while trying to change the PO Token Server Port. Please try again.',
    sleepIntervalsUpdated: 'Sleep Intervals updated',
    sleepIntervalsUpdatedDesc: 'Min Sleep Interval changed to ',
    sleepIntervalsUpdateFailed: 'Failed to change sleep intervals',
    sleepIntervalsUpdateFailedDesc: 'An error occurred while trying to change the sleep intervals. Please try again.',
    notificationPermissionDenied: 'Notification Permission Denied',
    notificationPermissionDeniedDesc: 'You have denied the notification permission. Please enable it from your system settings to receive notifications.',
    customCommandAdded: 'Custom Command added',
    customCommandAddedDesc: 'Custom Command ',
    customCommandAddFailed: 'Failed to add custom command',
    customCommandAddFailedDesc: 'An error occurred while trying to add the custom command. Please try again.',
    customCommandRemoved: 'Custom Command removed',
    customCommandRemovedDesc: 'Custom Command has been successfully removed.',
    customCommandRemoveFailed: 'Failed to remove custom command',
    customCommandRemoveFailedDesc: 'An error occurred while trying to remove the custom command. Please try again.',
    
    // Placeholders
    selectDownloadDirectory: 'Select download directory',
    selectCookiesTextFile: 'Select cookies text file',
    minSleep: 'Min sleep',
    maxSleep: 'Max sleep',
    requestSleep: 'Request sleep',
    labelPlaceholder: 'Label',
    argsPlaceholder: 'Arguments',
    selectPortPlaceholder: 'Select port',
    selectUpdateChannel: 'Select update channel',
    
    // Buttons
    updating: 'Updating',
    updateNow: 'Update Now',
    downloadNow: 'Download Now',
    readChangelog: 'Read Changelog',
    writeAnEmail: 'Write Us an Email',
    createGitHubIssue: 'Create a GitHub Issue',
    mitLicense: 'MIT License',
    dependencies: 'Dependencies',
    supportedSites: 'Supported Sites',
    
    // Other UI
    updateAvailable: 'Update Available',
    updateAvailableDesc: 'A newer version of NeoDLP is available. Please update to the latest version for the best experience.',
    updateApp: 'Updating NeoDLP',
    updateAppDesc: 'Updating NeoDLP to v',
    updateDownloading: 'Downloading update...',
    versionLoading: 'Loading...',
    versionUnknown: 'unknown',
    selectBrowserToImportCookies: 'Select browser to import cookies',
    browsers: 'Browsers',
    externalBinaries: 'External Binaries',
    languagesFrameworksTooling: 'Languages, Frameworks & Tooling',
    notableLibraries: 'Notable Libraries',
    neoDlpIsFullyOpenSource: 'NeoDLP is a Fully Open-Source Software Licensed under the MIT license. Anyone can view, modify, use (personal and commercial) or distribute its sources without any extra permission (Just include the LICENSE file :)',
    disclaimer: 'DISCLAIMER: NeoDLP facilitates downloading from various Online Platforms with different Policies and Terms of Use which Users must follow. We strictly do not promote any unauthorized downloading of copyrighted content. NeoDLP is only made for downloading content that the user holds the copyright to or has the authority for. Users must use the downloaded content wisely and solely at their own legal responsibility. The developer is not responsible for any action taken by the user, and takes zero direct or indirect liability for that matter.',
    flatpakSandboxDetected: 'Flatpak Sandbox Detected!',
    flatpakSandboxDesc: 'It looks like you are running NeoDLP in a Flatpak sandbox. Some features like browser integration, desktop notifications, cookies, changing download folder, revealing completed downloads in explorer, and auto-launch on startup are not available in Flatpak due to sandbox restrictions. To use these features, please install the native linux build (DEB, RPM or AUR) of NeoDLP.',
    appImageEnvDetected: 'AppImage Environment Detected!',
    appImageEnvDesc: 'Looks like you are using NeoDLP AppImage. NeoDLP\'s browser integration features are not available on AppImage environment due to it\'s limitations. To use NeoDLP\'s browser integration features please install the native linux build (DEB, RPM or AUR) of NeoDLP.',
    allSet: 'All Set! Cheers :)',
    allSetDesc: 'NeoDLP is running as normal without any limitations! You should be able to use all the features of NeoDLP without any issues. If you face any problem, feel free to report it to us.',
    healthCheck: 'Health Check',
    healthCheckDesc: 'Ensure everything is working fine',
    bugReport: 'Bug Report',
    bugReportDesc: 'Noticed any bug or inconsistencies? Report it to help us improve',
    licenseAndUsage: 'License and Usage',
    licenseAndUsageDesc: 'License and usage terms of NeoDLP',
    notifications: 'Desktop Notifications',
    notificationsDesc: 'Enable desktop notifications for app events (updates, download completions, etc.)',
    enableNotifications: 'Enable Notifications',
    notificationCategories: 'Notification Categories',
    appUpdates: 'App Updates',
    downloadCompletion: 'Download Completion',
    delaySettings: 'Delay',
    delayDesc: 'Use delay to prevent potential issues with some sites (bypass rate-limit, temporary ban, etc.)',
    useDelayInDownloads: 'Use Delay in Downloads',
    useDelayInSearch: 'Use Delay in Search',
    delayPlaylistOnly: 'Delay Playlist Only',
    delayPlaylistOnlyDesc: 'Only apply delay for playlist/batch downloads, single video downloads will not be affected (recommended)',
    minMaxSleepInterval: 'Minimum, Maximum Sleep Interval (in Seconds)',
    requestSleepIntervalSec: 'Request Sleep Interval (in Seconds)',
    customCommands: 'Custom Commands',
    customCommandsDesc: 'Add custom yt-dlp commands to extend functionality',
    useCustomCommands: 'Use Custom Commands',
    addCustomCommandBtn: 'Add Custom Command',
    debugSettings: 'Debug Mode',
    debugSettingsDesc: 'Enable debug mode for troubleshooting issues (get debug logs, download ids, and more)',
    enableDebugMode: 'Enable Debug Mode',
    loggingOptions: 'Logging Options',
    verboseLogging: 'Verbose Logging',
    logProgress: 'Log Progress',
    potTokenSettings: 'PO Token',
    potTokenDesc: 'Generate proof-of-origin token for youtube to make seem your traffic more legitimate (bypasses some bot-protection checks, sometimes requires cookies)',
    usePotToken: 'Use PO Token',
    disableInnertube: 'Disable Innertube',
    potServerPort: 'POT Server Port',
    aboutInfoSettings: 'About',
    neoDownloaderPlus: 'Neo Downloader Plus',
    fullStackDeveloper: 'Full-Stack Developer',
    officialWebsite: 'Official Website',
    buyMeACoffee: 'Buy Me a Coffee',
    sponsor: 'Sponsor',
    verified: 'Verified',
    
    videoDownloader: 'Video Downloader',
    playlistDownloader: 'Playlist Downloader',
    enterUrl: 'Enter URL...',
    search: 'Search',
    searching: 'Searching...',
    download: 'Download',
    downloading: 'Downloading',
    paused: 'Paused',
    completed: 'Completed',
    failed: 'Failed',
    cancel: 'Cancel',
    
    completedDownloads: 'Completed',
    incompleteDownloads: 'Incomplete',
    noDownloads: 'No Downloads',
    noIncompleteDownloads: 'No Incomplete Downloads',
    allCaughtUp: 'You have all caught up! Sit back and relax or just spin up a new download to see here :)',
    spinUpNewDownload: 'Spin Up a New Download',
    stop: 'Stop',
    
    general: 'General',
    appearance: 'Appearance',
    filesystem: 'Filesystem',
    format: 'Format',
    embed: 'Embed',
    network: 'Network',
    cookies: 'Cookies',
    sponsorblock: 'SponsorBlock',
    extension: 'Extension',
    
    maxParallelDownloads: 'Max Parallel Downloads',
    setMaxParallelDownloads: 'Set maximum number of allowed parallel downloads',
    preferVideoOverPlaylist: 'Prefer Video Over Playlist',
    preferVideoOverPlaylistDesc: 'Prefer only the video, if the URL refers to a video and a playlist',
    strictDownloadabilityCheck: 'Strict Downloadability Check',
    strictDownloadabilityCheckDesc: 'Only show streams that are actually downloadable, also check formats before downloading (high quality results, takes longer time to search)',
    maxRetries: 'Max Retries',
    setMaxRetries: 'Set maximum number of retries for a download before giving up',
    aria2: 'Aria2',
    aria2Desc: 'Use aria2c as external downloader (recommended only if you are experiencing too slow download speeds with native downloader, you need to install aria2 via homebrew if you are on macOS to use this feature',
    
    theme: 'Theme',
    chooseAppTheme: 'Choose app interface theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    colorScheme: 'Color Scheme',
    chooseAppColorScheme: 'Choose app interface color scheme',
    default: 'Default',
    blue: 'Blue',
    green: 'Green',
    orange: 'Orange',
    red: 'Red',
    rose: 'Rose',
    violet: 'Violet',
    yellow: 'Yellow',
    
    downloadFolder: 'Download Folder',
    setDefaultDownloadFolder: 'Set default download folder (directory)',
    temporaryDownloadFolder: 'Temporary Download Folder',
    cleanupTempDownloads: 'Cleanup Temporary Downloads',
    filenameTemplate: 'Filename Template',
    setFilenameTemplate: 'Set the template for naming downloaded files (download id, file extension and playlist index will be auto-appended, changing template may cause paused downloads to restart from beginning',
    sanitizeFilenames: 'Sanitize Filenames',
    sanitizeFilenamesDesc: 'Make filenames Windows-compatible, allow only ASCII characters and replace spaces with underscores (recommended, disabling may cause issues with some downloads)',
    windowsCompatibility: 'Windows Compatibility',
    forceAsciiOnly: 'Force ASCII Only',
    browse: 'Browse',
    save: 'Save',
    clean: 'Clean',
    
    videoFormat: 'Video Format',
    chooseVideoFormat: 'Choose in which format the final video file will be saved',
    audioFormat: 'Audio Format',
    chooseAudioFormat: 'Choose in which format the final audio file will be saved',
    alwaysReencodeVideo: 'Always Re-encode Video',
    alwaysReencodeVideoDesc: 'Instead of remuxing (simple container change), always re-encode the video to the target format with best compatible codecs (better compatibility, takes longer processing time)',
    auto: 'Auto (Default)',
    
    embedMetadata: 'Embed Metadata',
    embedMetadataDesc: 'Whether to embed metadata in video/audio files (info, chapters)',
    embedThumbnail: 'Embed Thumbnail',
    embedThumbnailDesc: 'Whether to embed thumbnail in video/audio files (as cover art)',
    video: 'Video',
    audio: 'Audio',
    
    proxy: 'Proxy',
    proxyDesc: 'Use proxy for downloads, unblocks blocked sites in your region (download speed may affect, some sites may not work)',
    useProxy: 'Use Proxy',
    enterProxyUrl: 'Enter proxy URL',
    proxyUrlRequired: 'Proxy URL is required',
    invalidUrlFormat: 'Invalid URL format',
    configured: 'Configured',
    status: 'Status',
    enabled: 'Enabled',
    disabled: 'Disabled',
    rateLimit: 'Rate Limit',
    rateLimitDesc: 'Limit download speed to prevent network congestion. Rate limit is applied per-download basis (not in the whole app)',
    useRateLimit: 'Use Rate Limit',
    enterRateLimit: 'Enter rate limit in bytes/s',
    rateLimitRequired: 'Rate Limit is required',
    rateLimitValidNumber: 'Rate Limit must be a valid number',
    rateLimitInteger: 'Rate Limit must be an integer',
    rateLimitMin: 'Rate Limit must be at least 1024 bytes/s (1 KB/s)',
    rateLimitMax: 'Rate Limit must be at most 104857600 bytes/s (100 MB/s)',
    forceInternetProtocol: 'Force Internet Protocol',
    forceInternetProtocolDesc: 'Force use a specific internet protocol (ipv4/ipv6) for all downloads, useful if your network supports only one (some sites may not work)',
    forceIpv: 'Force IP Version',
    useIpv4Only: 'Use IPv4 Only',
    useIpv6Only: 'Use IPv6 Only',
    forced: 'Forced',
    
    cookiesSettings: 'Cookies',
    cookiesDesc: 'Use cookies to access exclusive/private (login-protected) contents from sites (use wisely, overuse may even ban your account)',
    useCookies: 'Use Cookies',
    importFromBrowser: 'Import from Browser',
    importFromTextFile: 'Import from Text File',
    importCookiesFromBrowser: 'Import Cookies from Browser',
    selectBrowserToImport: 'Select browser to import cookies',
    firefoxRecommended: 'Firefox (Recommended)',
    chrome: 'Chrome',
    chromium: 'Chromium',
    safari: 'Safari',
    brave: 'Brave',
    edge: 'Edge',
    opera: 'Opera',
    vivaldi: 'Vivaldi',
    whale: 'Whale',
    importCookiesFromTextFile: 'Import Cookies from Text File (Netscape format)',
    selectCookiesTextFile: 'Select cookies text file',
    from: 'From',
    
    sponsorblockSettings: 'SponsorBlock',
    sponsorblockDesc: 'Use SponsorBlock to remove/mark unwanted segments in videos (sponsorships, intros, outros, etc.)',
    useSponsorblock: 'Use SponsorBlock',
    removeSegments: 'Remove Segments',
    markSegments: 'Mark Segments',
    sponsorblockRemoveCategories: 'SponsorBlock Remove Categories',
    sponsorblockMarkCategories: 'SponsorBlock Mark Categories',
    all: 'All',
    custom: 'Custom',
    sponsorship: 'Sponsorship',
    intro: 'Intro',
    outro: 'Outro',
    interaction: 'Interaction',
    selfPromotion: 'Self-promotion',
    musicOfftopic: 'Music/Offtopic',
    preview: 'Preview',
    filler: 'Filler',
    chapter: 'Chapter',
    hook: 'Hook',
    pointOfInterest: 'Point of Interest',
    
    current: 'Current',
    language: 'Language',
    selectLanguage: 'Select Language',
    english: 'English',
    simplifiedChinese: '简体中文',
    default: 'Default',
    range: 'Range',
    yes: 'Yes',
    no: 'No',
    mode: 'Mode',
    unknown: 'Unknown',
    browsers: 'Browsers',
    browser: 'Browser',
    text: 'Text',
    
    settingsTitle: 'Settings',
    settingsDescription: 'Manage your preferences and app settings',
    applicationTab: 'Application',
    extensionTab: 'Extension',
    reset: 'Reset',
    autoUpdate: 'Auto Update',
    nightly: 'Nightly',
    update: 'Update',
    version: 'Version',
    label: 'Label',
    labelRequired: 'Label is required',
    args: 'Arguments',
    argsRequired: 'Arguments are required',
    addCustomCommand: 'Add Custom Command',
    add: 'Add',
    sleepInterval: 'Sleep Interval',
    requestSleepInterval: 'Request Sleep Interval',
    setMinSleepInterval: 'Set minimum sleep interval between downloads',
    setMaxSleepInterval: 'Set maximum sleep interval between downloads',
    minSleepInterval: 'Min Sleep Interval',
    maxSleepInterval: 'Max Sleep Interval',
    minSleepIntervalRequired: 'Minimum Sleep Interval is required',
    maxSleepIntervalRequired: 'Maximum Sleep Interval is required',
    minSleepIntervalValidNumber: 'Minimum Sleep Interval must be a valid number',
    maxSleepIntervalValidNumber: 'Maximum Sleep Interval must be a valid number',
    minSleepIntervalInteger: 'Minimum Sleep Interval must be an integer',
    maxSleepIntervalInteger: 'Maximum Sleep Interval must be an integer',
    minSleepIntervalMin: 'Minimum Sleep Interval must be at least 1 second',
    maxSleepIntervalMin: 'Maximum Sleep Interval must be at least 1 second',
    minSleepIntervalMax: 'Minimum Sleep Interval must be at most 3600 seconds (1 hour)',
    maxSleepIntervalMax: 'Maximum Sleep Interval must be at most 3600 seconds (1 hour)',

    // Downloader
    searchTitle: 'Search',
    enterVideoPlaylistUrl: 'Enter Video/Playlist URL to Download',
    noResultsFound: 'Oops! No results found',
    noResultsFoundDesc: 'The provided URL does not contain any downloadable content or you are not connected to the internet. Please check the URL, your network connection and try again.',
    invalidUrl: 'Invalid URL',
    invalidUrlDesc: 'The provided URL is not valid.',
    searchInProgress: 'Search in progress',
    searchInProgressDesc: 'There\'s a search in progress, Please try again later.',
    metadata: 'Metadata',
    playlist: 'Playlist',

    // Library
    libraryTitle: 'Library',
    libraryDescription: 'Manage all your downloads in one place',
    stopAllOngoingDownloads: 'Stop all ongoing downloads?',
    stopAllOngoingDownloadsDesc: 'Are you sure you want to stop all ongoing downloads? This will pause all downloads including the download queue.',
    failedToStopDownload: 'Failed to stop download',
    failedToStopDownloadDesc: 'An error occurred while trying to stop the download for',
    stoppedOngoingDownloads: 'Stopped ongoing downloads',
    stoppedOngoingDownloadsDesc: 'All ongoing downloads have been stopped successfully.',
    noOngoingDownloads: 'No ongoing downloads',
    noOngoingDownloadsDesc: 'There are no ongoing downloads to stop.',
    extractedFrom: 'Extracted from',

    // Common validation
    urlRequired: 'URL is required',
    invalidUrlFormat: 'Invalid URL format',
    
    // Additional UI text
    enterFilenameTemplate: 'Enter filename template',
    temporaryDownloadDirectory: 'Temporary download directory',
    cleanUpAllTempDownloads: 'Clean up all temporary downloads?',
    cleanUpAllTempDownloadsDesc: 'Are you sure you want to clean up all temporary downloads? This will remove all broken, cancelled and paused downloads from the temporary folder. Paused downloads will re-start from the begining. This action cannot be undone!',
    inSeconds: 'in Seconds',
    mode: 'Mode',
    auto: 'Auto',
    custom: 'Custom',
    status: 'Status',
    playlistOnly: 'Playlist Only',
    downloads: 'Downloads',
    search: 'Search',
    default: 'Default',
    range: 'Range',
    neoDlpPotServerIs: 'NeoDLP POT Server is',
    optionsUnavailable: 'Options Unavailable!',
    optionsUnavailableDesc: 'You cannot use these options when custom commands are enabled. To use these options, disable custom commands from Settings.',
    outputFormat: 'Output Format',
    video: 'Video',
    audio: 'Audio',
    followSettings: 'Follow Settings',
    items: 'Items',
    errorInitiatingDownload: 'There was an error initiating the download.',
    configurations: 'Configurations',
    tweakDownloadConfigurations: 'Tweak this download\'s configurations',
    options: 'Options',
    commands: 'Commands',
    failedToStartDownload: 'Failed to Start Download',
    startingDownload: 'Starting Download',
    startDownload: 'Start Download',
    statusAuto: 'Auto',
    statusCombined: 'Combined',
    statusForced: 'Forced',
    statusUnknown: 'unknown',
    starting: 'Starting',
    running: 'Running',
    notRunning: 'Not Running',
    onPort: 'on Port',
    disableInnertubeDesc: 'Disable the usage of innertube api for potoken generation (falls back to legacy mode, use only if normal potoken is not working)',
    potServerPort: 'POT Server Port',
    potServerPortDesc: 'Change neodlp proof-of-origin token server port',
    enterPortNumber: 'Enter port number',
    current: 'Current',
    changing: 'Changing',
    selectUpdateChannel: 'Select update channel',
    updateChannels: 'Update Channels',
    stable: 'Stable',
    updating: 'Updating',
    websocketPortRequired: 'Websocket Port is required',
    websocketPortValidNumber: 'Websocket Port must be a valid number',
    websocketPortInteger: 'Websocket Port must be an integer',
    websocketPortMin: 'Websocket Port must be at least 50000',
    websocketPortMax: 'Websocket Port must be at most 60000',
    openingLink: 'Opening link',
    openingLinkDesc: 'Opening link with {app}.',
    failedToOpenLink: 'Failed to open link',
    failedToOpenLinkDesc: 'An error occurred while trying to open the link.',
    neoDlpExtension: 'NeoDLP Extension',
    integrateNeoDlpBrowser: 'Integrate NeoDLP with your favourite browser',
    getNow: 'Get Now',
    getChromeExtension: 'Get Chrome Extension',
    fromChromeWebStore: 'from Chrome Web Store',
    getFirefoxExtension: 'Get Firefox Extension',
    fromMozillaAddonsStore: 'from Mozilla Addons Store',
    linkNote: '* These links opens with coresponding browsers only. Make sure the browser is installed before clicking the link',
    websocketPort: 'Websocket Port',
    changeExtensionWebsocketPort: 'Change extension websocket server port',
    websocketPortUpdated: 'Websocket port updated',
    websocketPortUpdatedDesc: 'Websocket port changed to {port}',
    failedToChangeWebsocketPort: 'Failed to change websocket port',
    failedToChangeWebsocketPortDesc: 'An error occurred while trying to change the websocket port. Please try again.',
    change: 'Change',
    install: 'Install',
    port: 'Port',
    extensionWebsocketServer: 'Extension Websocket Server',
    restarting: 'Restarting...',
    running: 'Running',
    websocketServerRestarted: 'Websocket server restarted',
    websocketServerRestartedDesc: 'Websocket server restarted successfully.',
    failedToRestartWebsocketServer: 'Failed to restart websocket server',
    failedToRestartWebsocketServerDesc: 'An error occurred while trying to restart the websocket server. Please try again.',
    restart: 'Restart',
    neoDownloaderPlus: 'Neo Downloader Plus',
    loading: 'Loading...',
    updateAvailableTooltip: 'Update Available',
    expandSidebarToViewUpdate: '(Expand sidebar to view update)',
    updateAvailableTitle: 'Update Available',
    updateAvailableVersion: 'Update Available (v{version})',
    aNewerVersionOfNeodlpAvailable: 'A newer version of NeoDLP is available. Please update to the latest version for the best experience.',
    application: 'Application',
    extension: 'Extension',
    resetSettingsToDefault: 'Reset settings to default?',
    areYouSureResetSettings: 'Are you sure you want to reset all settings to their default values? This action cannot be undone!',
    logs: 'Logs',
    logViewer: 'Log Viewer',
    monitorRealtimeAppLogs: 'Monitor real-time app session logs (latest on top)',
    noLogsToShow: 'NO LOGS TO SHOW!',
    clearLogs: 'Clear Logs',
    copyLogs: 'Copy Logs',
    potoken: 'Potoken',
    notifications: 'Notifications',
    commands: 'Commands',
    debug: 'Debug',
    info: 'Info',
    failedToSelectFolder: 'Failed to select folder',
    failedToSelectFolderDesc: 'An error occurred while trying to select the download folder. Please try again.',
    failedToSelectCookiesFile: 'Failed to select cookies file',
    failedToSelectCookiesFileDesc: 'An error occurred while trying to select the cookies text file. Please try again.',
    mostSettingsDisabled: 'Most Settings will be Disabled!',
    customCommandsWarning: 'This feature is intended for advanced users only. Turning it on will disable most other settings in the app. Make sure you know what you are doing before using this feature, otherwise things could break easily.',
    customCommandsPlaceholder: 'Enter yt-dlp command line arguments (no need to start with \'yt-dlp\', already passed args: url, output paths, selected formats, selected subtitles, playlist items etc.)',
    noCustomCommands: 'NO CUSTOM COMMAND TEMPLATE ADDED YET!',
    customCommandTemplates: 'Custom Command Templates',
    // Library
    open: 'Open',
    reveal: 'Reveal',
    remove: 'Remove',
    removeFromLibrary: 'Remove from library?',
    removeFromLibraryDesc: 'Are you sure you want to remove this download from the library? You can also delete the downloaded file by cheking the box below. This action cannot be undone.',
    deleteDownloadedFile: 'Delete the downloaded file',
    noCompletedDownloads: 'No Completed Downloads',
    noCompletedDownloadsDesc: 'You have not completed any downloads yet! Complete downloading something to see here :)',
    spinUpNewDownload: 'Spin Up a New Download',
    noIncompleteDownloads: 'No Incomplete Downloads',
    noIncompleteDownloadsDesc: 'You have all caught up! Sit back and relax or just spin up a new download to see here :)',
    revealingFile: 'Revealing file',
    revealingFileDesc: 'Revealing the file in {app}.',
    openingFile: 'Opening file',
    openingFileDesc: 'Opening the file with {app}.',
    failedToRevealFile: 'Failed to reveal file',
    failedToRevealFileDesc: 'An error occurred while trying to reveal the file.',
    failedToOpenFile: 'Failed to open file',
    failedToOpenFileDesc: 'An error occurred while trying to open the file.',
    fileUnavailable: 'File unavailable',
    fileUnavailableDesc: 'The file you are trying to {action} does not exist.',
    deletedFromDownloads: 'Deleted from downloads',
    deletedFromDownloadsDesc: 'The download for {prefix}"{title}" has been deleted successfully.',
    removedFromDownloads: 'Removed from downloads',
    removedFromDownloadsDesc: 'The download for {prefix}"{title}" has been removed successfully.',
    failedToDeleteDownload: 'Failed to delete download',
    failedToDeleteDownloadDesc: 'An error occurred while trying to delete the download for {prefix}"{title}".',
    failedToRemoveDownload: 'Failed to remove download',
    failedToRemoveDownloadDesc: 'An error occurred while trying to remove the download for {prefix}"{title}".',
    initiatingVideoSearch: 'Initiating Video Search',
    initiatingPlaylistSearch: 'Initiating Playlist Search',
    initiatingSearchDesc: 'Initiating search for the selected {type}.',
    failedToInitiateSearch: 'Failed to initiate search',
    failedToInitiateSearchDesc: 'An error occurred while trying to initiate the search.',
    playlist: 'Playlist',
    video: 'Video',
    unknown: 'unknown',
    unknownPlaylist: 'UNKNOWN PLAYLIST',
    unknownChannel: 'UNKNOWN CHANNEL',
    embeddedSubtitle: 'EMBEDED SUBTITLE ({id})',
    sponsorblockMarked: 'SPONSORBLOCK MARKED ({type})',
    sponsorblockRemoved: 'SPONSORBLOCK REMOVED ({type})',
    multiaudio: 'MULTIAUDIO',
    processing: 'Processing',
    errored: 'Errored',
    speed: 'Speed',
    resumedDownload: 'Resumed Download',
    resumedDownloadDesc: 'Download resumed, it will re-start shortly.',
    failedToResumeDownload: 'Failed to Resume Download',
    failedToResumeDownloadDesc: 'An error occurred while trying to resume the download for "{title}".',
    resuming: 'Resuming',
    resume: 'Resume',
    failedToRestartDownload: 'Failed to Restart Download',
    failedToRestartDownloadDesc: 'An error occurred while trying to restart the download for "{title}".',
    retrying: 'Retrying',
    retry: 'Retry',
    pausedDownload: 'Paused Download',
    pausedDownloadDesc: 'Download paused successfully.',
    failedToPauseDownload: 'Failed to Pause Download',
    failedToPauseDownloadDesc: 'An error occurred while trying to pause the download for "{title}".',
    pausing: 'Pausing',
    pause: 'Pause',
    canceledDownload: 'Canceled Download',
    canceledDownloadDesc: 'The download for "{title}" has been canceled.',
    failedToCancelDownload: 'Failed to Cancel Download',
    failedToCancelDownloadDesc: 'An error occurred while trying to cancel the download for "{title}".',
    canceling: 'Canceling',
  },
  'zh-CN': {
    downloader: '下载器',
    library: '媒体库',
    settings: '设置',
    
    // Toast Messages
    tempDownloadsCleaned: '临时下载已清理',
    tempDownloadsCleanedDesc: '所有临时下载已成功清理。',
    tempDownloadsCleanupFailed: '临时下载清理失败',
    tempDownloadsCleanupFailedDesc: '尝试清理临时下载时出错。请重试。',
    noTempDownloads: '无临时下载',
    noTempDownloadsDesc: '没有需要清理的临时下载。',
    filenameTemplateUpdated: '文件名模板已更新',
    filenameTemplateUpdatedDesc: '文件名模板更改为 ',
    filenameTemplateUpdateFailed: '更改文件名模板失败',
    filenameTemplateUpdateFailedDesc: '尝试更改文件名模板时出错。请重试。',
    proxyUrlUpdated: '代理 URL 已更新',
    proxyUrlUpdatedDesc: '代理 URL 更改为 ',
    proxyUrlUpdateFailed: '更改代理 URL 失败',
    proxyUrlUpdateFailedDesc: '尝试更改代理 URL 时出错。请重试。',
    rateLimitUpdated: '速率限制已更新',
    rateLimitUpdatedDesc: '速率限制更改为 ',
    rateLimitUpdateFailed: '更改速率限制失败',
    rateLimitUpdateFailedDesc: '尝试更改速率限制时出错。请重试。',
    potServerPortUpdated: 'POT 服务器端口已更新',
    potServerPortUpdatedDesc: 'PO 令牌服务器端口更改为 ',
    potServerPortUpdateFailed: '更改 POT 服务器端口失败',
    potServerPortUpdateFailedDesc: '尝试更改 PO 令牌服务器端口时出错。请重试。',
    sleepIntervalsUpdated: '睡眠间隔已更新',
    sleepIntervalsUpdatedDesc: '最小睡眠间隔更改为 ',
    sleepIntervalsUpdateFailed: '更改睡眠间隔失败',
    sleepIntervalsUpdateFailedDesc: '尝试更改睡眠间隔时出错。请重试。',
    notificationPermissionDenied: '通知权限被拒绝',
    notificationPermissionDeniedDesc: '您已拒绝通知权限。请从系统设置中启用它以接收通知。',
    customCommandAdded: '自定义命令已添加',
    customCommandAddedDesc: '自定义命令 ',
    customCommandAddFailed: '添加自定义命令失败',
    customCommandAddFailedDesc: '尝试添加自定义命令时出错。请重试。',
    customCommandRemoved: '自定义命令已移除',
    customCommandRemovedDesc: '自定义命令已成功移除。',
    customCommandRemoveFailed: '移除自定义命令失败',
    customCommandRemoveFailedDesc: '尝试移除自定义命令时出错。请重试。',
    
    // Placeholders
    selectDownloadDirectory: '选择下载目录',
    selectCookiesTextFile: '选择 Cookies 文本文件',
    minSleep: '最小睡眠',
    maxSleep: '最大睡眠',
    requestSleep: '请求睡眠',
    labelPlaceholder: '标签',
    argsPlaceholder: '参数',
    selectPortPlaceholder: '选择端口',
    selectUpdateChannel: '选择更新频道',
    
    // Buttons
    updating: '更新中',
    updateNow: '立即更新',
    downloadNow: '立即下载',
    readChangelog: '阅读更新日志',
    writeAnEmail: '给我们写邮件',
    createGitHubIssue: '创建 GitHub Issue',
    mitLicense: 'MIT 许可证',
    dependencies: '依赖项',
    supportedSites: '支持的网站',
    
    // Other UI
    updateAvailable: '有更新可用',
    updateAvailableDesc: '有 NeoDLP 的新版本可用。请更新到最新版本以获得最佳体验。',
    updateApp: '正在更新 NeoDLP',
    updateAppDesc: '正在更新 NeoDLP 到 v',
    updateDownloading: '正在下载更新...',
    versionLoading: '加载中...',
    versionUnknown: '未知',
    selectBrowserToImportCookies: '选择要导入 cookies 的浏览器',
    browsers: '浏览器',
    externalBinaries: '外部二进制文件',
    languagesFrameworksTooling: '语言、框架和工具',
    notableLibraries: '知名库',
    neoDlpIsFullyOpenSource: 'NeoDLP 是一个完全开源的软件，根据 MIT 许可证授权。任何人都可以查看、修改、使用（个人和商业）或分发其源代码，而无需任何额外许可（只需包含 LICENSE 文件 :)',
    disclaimer: '免责声明：NeoDLP 便于从各种在线平台下载，这些平台有不同的政策和使用条款，用户必须遵守。我们严格不提倡未经授权下载受版权保护的内容。NeoDLP 仅用于下载用户拥有版权或有授权的内容。用户必须明智地使用下载的内容，并完全自行承担法律责任。开发者不对用户采取的任何行动负责，对此不承担任何直接或间接责任。',
    flatpakSandboxDetected: '检测到 Flatpak 沙盒！',
    flatpakSandboxDesc: '看起来您正在 Flatpak 沙盒中运行 NeoDLP。由于沙盒限制，某些功能如浏览器集成、桌面通知、cookies、更改下载文件夹、在资源管理器中显示已完成下载和开机自启动在 Flatpak 中不可用。要使用这些功能，请安装 NeoDLP 的原生 Linux 构建（DEB、RPM 或 AUR）。',
    appImageEnvDetected: '检测到 AppImage 环境！',
    appImageEnvDesc: '看起来您正在使用 NeoDLP AppImage。由于其限制，NeoDLP 的浏览器集成功能在 AppImage 环境中不可用。要使用 NeoDLP 的浏览器集成功能，请安装 NeoDLP 的原生 Linux 构建（DEB、RPM 或 AUR）。',
    allSet: '一切就绪！干杯 :)',
    allSetDesc: 'NeoDLP 运行正常，没有任何限制！您应该能够毫无问题地使用 NeoDLP 的所有功能。如果遇到任何问题，请随时向我们报告。',
    healthCheck: '健康检查',
    healthCheckDesc: '确保一切正常工作',
    bugReport: '错误报告',
    bugReportDesc: '发现任何错误或不一致之处？报告它以帮助我们改进',
    licenseAndUsage: '许可和使用',
    licenseAndUsageDesc: 'NeoDLP 的许可和使用条款',
    notifications: '桌面通知',
    notificationsDesc: '为应用事件启用桌面通知（更新、下载完成等）',
    enableNotifications: '启用通知',
    notificationCategories: '通知类别',
    appUpdates: '应用更新',
    downloadCompletion: '下载完成',
    delaySettings: '延迟',
    delayDesc: '使用延迟来防止某些网站的潜在问题（绕过速率限制、临时封禁等）',
    useDelayInDownloads: '下载中使用延迟',
    useDelayInSearch: '搜索中使用延迟',
    delayPlaylistOnly: '仅播放列表延迟',
    delayPlaylistOnlyDesc: '仅对播放列表/批量下载应用延迟，单个视频下载不受影响（推荐）',
    minMaxSleepInterval: '最小、最大睡眠间隔（秒）',
    requestSleepIntervalSec: '请求睡眠间隔（秒）',
    customCommands: '自定义命令',
    customCommandsDesc: '添加自定义 yt-dlp 命令以扩展功能',
    useCustomCommands: '使用自定义命令',
    addCustomCommandBtn: '添加自定义命令',
    debugSettings: '调试模式',
    debugSettingsDesc: '启用调试模式以排查问题（获取调试日志、下载 ID 等）',
    enableDebugMode: '启用调试模式',
    loggingOptions: '日志选项',
    verboseLogging: '详细日志',
    logProgress: '日志进度',
    potTokenSettings: 'PO 令牌',
    potTokenDesc: '为 YouTube 生成来源证明令牌，使您的流量看起来更合法（绕过一些机器人保护检查，有时需要 cookies）',
    usePotToken: '使用 PO 令牌',
    disableInnertube: '禁用 Innertube',
    potServerPort: 'POT 服务器端口',
    aboutInfoSettings: '关于',
    neoDownloaderPlus: 'Neo Downloader Plus',
    fullStackDeveloper: '全栈开发者',
    officialWebsite: '官方网站',
    buyMeACoffee: '请我喝杯咖啡',
    sponsor: '赞助',
    verified: '已验证',
    
    videoDownloader: '视频下载器',
    playlistDownloader: '播放列表下载器',
    enterUrl: '输入 URL...',
    search: '搜索',
    searching: '搜索中...',
    download: '下载',
    downloading: '下载中',
    paused: '已暂停',
    completed: '已完成',
    failed: '失败',
    cancel: '取消',
    
    completedDownloads: '已完成',
    incompleteDownloads: '未完成',
    noDownloads: '暂无下载',
    noIncompleteDownloads: '没有未完成的下载',
    allCaughtUp: '全都完成了！休息一下，或者开始新的下载 :)',
    spinUpNewDownload: '开始新下载',
    stop: '停止',
    
    general: '常规',
    appearance: '外观',
    filesystem: '文件系统',
    format: '格式',
    embed: '嵌入',
    network: '网络',
    cookies: 'Cookies',
    sponsorblock: 'SponsorBlock',
    extension: '扩展',
    
    maxParallelDownloads: '最大并行下载数',
    setMaxParallelDownloads: '设置允许的最大并行下载数量',
    preferVideoOverPlaylist: '优先下载视频而非播放列表',
    preferVideoOverPlaylistDesc: '如果 URL 同时指向视频和播放列表，仅下载视频',
    strictDownloadabilityCheck: '严格下载检查',
    strictDownloadabilityCheckDesc: '仅显示可实际下载的流，下载前检查格式（高质量结果，搜索时间更长）',
    maxRetries: '最大重试次数',
    setMaxRetries: '设置下载放弃前的最大重试次数',
    aria2: 'Aria2',
    aria2Desc: '使用 aria2c 作为外部下载器（仅推荐在原生下载器速度过慢时使用，macOS 用户需通过 homebrew 安装 aria2）',
    
    theme: '主题',
    chooseAppTheme: '选择应用界面主题',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    colorScheme: '配色方案',
    chooseAppColorScheme: '选择应用界面配色方案',
    default: '默认',
    blue: '蓝色',
    green: '绿色',
    orange: '橙色',
    red: '红色',
    rose: '玫瑰色',
    violet: '紫色',
    yellow: '黄色',
    
    downloadFolder: '下载文件夹',
    setDefaultDownloadFolder: '设置默认下载文件夹（目录）',
    temporaryDownloadFolder: '临时下载文件夹',
    cleanupTempDownloads: '清理临时下载（损坏、取消、暂停的下载）',
    filenameTemplate: '文件名模板',
    setFilenameTemplate: '设置下载文件命名模板（下载 ID、文件扩展名和播放列表索引将自动追加，更改模板可能导致暂停的下载从头开始）',
    sanitizeFilenames: '清理文件名',
    sanitizeFilenamesDesc: '使文件名兼容 Windows，仅允许 ASCII 字符并用下划线替换空格（推荐，禁用可能导致某些下载问题）',
    windowsCompatibility: 'Windows 兼容性',
    forceAsciiOnly: '仅强制 ASCII',
    browse: '浏览',
    save: '保存',
    clean: '清理',
    
    videoFormat: '视频格式',
    chooseVideoFormat: '选择最终视频文件的保存格式',
    audioFormat: '音频格式',
    chooseAudioFormat: '选择最终音频文件的保存格式',
    alwaysReencodeVideo: '始终重新编码视频',
    alwaysReencodeVideoDesc: '始终使用最佳兼容编解码器将视频重新编码为目标格式，而非重新打包（简单容器更改）（更好的兼容性，处理时间更长）',
    auto: '自动（默认）',
    
    embedMetadata: '嵌入元数据',
    embedMetadataDesc: '是否在视频/音频文件中嵌入元数据（信息、章节）',
    embedThumbnail: '嵌入缩略图',
    embedThumbnailDesc: '是否在视频/音频文件中嵌入缩略图（作为封面）',
    video: '视频',
    audio: '音频',
    
    proxy: '代理',
    proxyDesc: '使用代理下载，解除您所在区域的网站封锁（下载速度可能受影响，某些网站可能无法工作）',
    useProxy: '使用代理',
    enterProxyUrl: '输入代理 URL',
    proxyUrlRequired: '代理 URL 为必填项',
    invalidUrlFormat: '无效的 URL 格式',
    configured: '已配置',
    status: '状态',
    enabled: '已启用',
    disabled: '已禁用',
    rateLimit: '速率限制',
    rateLimitDesc: '限制下载速度以防止网络拥塞。速率限制应用于每次下载（而非整个应用）',
    useRateLimit: '使用速率限制',
    enterRateLimit: '输入速率限制（字节/秒）',
    rateLimitRequired: '速率限制为必填项',
    rateLimitValidNumber: '速率限制必须是有效数字',
    rateLimitInteger: '速率限制必须是整数',
    rateLimitMin: '速率限制至少为 1024 字节/秒（1 KB/s）',
    rateLimitMax: '速率限制最多为 104857600 字节/秒（100 MB/s）',
    forceInternetProtocol: '强制网络协议',
    forceInternetProtocolDesc: '为所有下载强制使用特定网络协议（ipv4/ipv6），当您的网络仅支持一种时有用（某些网站可能无法工作）',
    forceIpv: '强制 IP 版本',
    useIpv4Only: '仅使用 IPv4',
    useIpv6Only: '仅使用 IPv6',
    forced: '已强制',
    
    cookiesSettings: 'Cookies',
    cookiesDesc: '使用 cookies 访问网站的专属/私有（登录保护）内容（明智使用，过度使用可能导致账户被封）',
    useCookies: '使用 Cookies',
    importFromBrowser: '从浏览器导入',
    importFromTextFile: '从文本文件导入',
    importCookiesFromBrowser: '从浏览器导入 Cookies',
    selectBrowserToImport: '选择要导入 cookies 的浏览器',
    firefoxRecommended: 'Firefox（推荐）',
    chrome: 'Chrome',
    chromium: 'Chromium',
    safari: 'Safari',
    brave: 'Brave',
    edge: 'Edge',
    opera: 'Opera',
    vivaldi: 'Vivaldi',
    whale: 'Whale',
    importCookiesFromTextFile: '从文本文件导入 Cookies（Netscape 格式）',
    selectCookiesTextFile: '选择 cookies 文本文件',
    from: '来源',
    
    sponsorblockSettings: 'SponsorBlock',
    sponsorblockDesc: '使用 SponsorBlock 移除/标记视频中的不需要片段（赞助、片头、片尾等）',
    useSponsorblock: '使用 SponsorBlock',
    removeSegments: '移除片段',
    markSegments: '标记片段',
    sponsorblockRemoveCategories: 'SponsorBlock 移除分类',
    sponsorblockMarkCategories: 'SponsorBlock 标记分类',
    all: '全部',
    custom: '自定义',
    sponsorship: '赞助',
    intro: '片头',
    outro: '片尾',
    interaction: '互动',
    selfPromotion: '自我推广',
    musicOfftopic: '音乐无关内容',
    preview: '预览',
    filler: '填充',
    chapter: '章节',
    hook: '钩子',
    pointOfInterest: '兴趣点',
    
    current: '当前',
    language: '语言',
    selectLanguage: '选择语言',
    english: 'English',
    simplifiedChinese: '简体中文',
    
    settingsTitle: '设置',
    settingsDescription: '管理您的偏好设置和应用设置',
    applicationTab: '应用',
    extensionTab: '扩展',
    reset: '重置',
    autoUpdate: '自动更新',
    nightly: 'Nightly',
    update: '更新',
    version: '版本',
    label: '标签',
    labelRequired: '标签为必填项',
    args: '参数',
    argsRequired: '参数为必填项',
    addCustomCommand: '添加自定义命令',
    add: '添加',
    sleepInterval: '睡眠间隔',
    requestSleepInterval: '请求睡眠间隔',
    setMinSleepInterval: '设置下载之间的最小睡眠间隔',
    setMaxSleepInterval: '设置下载之间的最大睡眠间隔',
    minSleepInterval: '最小睡眠间隔',
    maxSleepInterval: '最大睡眠间隔',
    minSleepIntervalRequired: '最小睡眠间隔为必填项',
    maxSleepIntervalRequired: '最大睡眠间隔为必填项',
    minSleepIntervalValidNumber: '最小睡眠间隔必须是有效数字',
    maxSleepIntervalValidNumber: '最大睡眠间隔必须是有效数字',
    minSleepIntervalInteger: '最小睡眠间隔必须是整数',
    maxSleepIntervalInteger: '最大睡眠间隔必须是整数',
    minSleepIntervalMin: '最小睡眠间隔至少为 1 秒',
    maxSleepIntervalMin: '最大睡眠间隔至少为 1 秒',
    minSleepIntervalMax: '最小睡眠间隔最多为 3600 秒（1 小时）',
    maxSleepIntervalMax: '最大睡眠间隔最多为 3600 秒（1 小时）',

    // Downloader
    searchTitle: '搜索',
    enterVideoPlaylistUrl: '输入视频/播放列表 URL 以下载',
    noResultsFound: '哎呀！未找到结果',
    noResultsFoundDesc: '提供的 URL 不包含任何可下载的内容，或者您没有连接到互联网。请检查 URL、您的网络连接并重试。',
    invalidUrl: '无效的 URL',
    invalidUrlDesc: '提供的 URL 无效。',
    searchInProgress: '搜索正在进行',
    searchInProgressDesc: '搜索正在进行中，请稍后重试。',
    metadata: '元数据',
    playlist: '播放列表',

    // Library
    libraryTitle: '媒体库',
    libraryDescription: '在一个地方管理所有下载',
    stopAllOngoingDownloads: '停止所有正在进行的下载？',
    stopAllOngoingDownloadsDesc: '您确定要停止所有正在进行的下载吗？这将暂停所有下载，包括下载队列。',
    failedToStopDownload: '停止下载失败',
    failedToStopDownloadDesc: '尝试停止下载时出错',
    stoppedOngoingDownloads: '已停止正在进行的下载',
    stoppedOngoingDownloadsDesc: '所有正在进行的下载已成功停止。',
    noOngoingDownloads: '没有正在进行的下载',
    noOngoingDownloadsDesc: '没有正在进行的下载需要停止。',
    extractedFrom: '提取自',

    // Common validation
    urlRequired: 'URL 为必填项',
    invalidUrlFormat: '无效的 URL 格式',
    
    // Additional UI text
    enterFilenameTemplate: '输入文件名模板',
    temporaryDownloadDirectory: '临时下载目录',
    cleanUpAllTempDownloads: '清理所有临时下载？',
    cleanUpAllTempDownloadsDesc: '您确定要清理所有临时下载吗？这将从临时文件夹中移除所有损坏、取消和暂停的下载。暂停的下载将从头开始重新下载。此操作无法撤销！',
    inSeconds: '以秒为单位',
    mode: '模式',
    auto: '自动',
    custom: '自定义',
    status: '状态',
    playlistOnly: '仅播放列表',
    downloads: '下载',
    search: '搜索',
    default: '默认',
    range: '范围',
    yes: '是',
    no: '否',
    browsers: '浏览器',
    browser: '浏览器',
    text: '文本',
    neoDlpPotServerIs: 'NeoDLP POT 服务器',
    optionsUnavailable: '选项不可用！',
    optionsUnavailableDesc: '启用自定义命令时，您无法使用这些选项。要使用这些选项，请从设置中禁用自定义命令。',
    outputFormat: '输出格式',
    video: '视频',
    audio: '音频',
    followSettings: '跟随设置',
    items: '项',
    errorInitiatingDownload: '开始下载时出错。',
    configurations: '配置',
    tweakDownloadConfigurations: '调整此下载的配置',
    options: '选项',
    commands: '命令',
    failedToStartDownload: '开始下载失败',
    startingDownload: '正在开始下载',
    startDownload: '开始下载',
    statusAuto: '自动',
    statusCombined: '组合',
    statusForced: '强制',
    statusUnknown: '未知',
    starting: '正在启动',
    running: '正在运行',
    notRunning: '未运行',
    onPort: '端口',
    disableInnertubeDesc: '禁用 innertube api 用于 potoken 生成（回退到传统模式，仅在普通 potoken 不工作时使用）',
    potServerPort: 'POT 服务器端口',
    potServerPortDesc: '更改 neodlp proof-of-origin token 服务器端口',
    enterPortNumber: '输入端口号',
    current: '当前',
    changing: '正在更改',
    selectUpdateChannel: '选择更新频道',
    updateChannels: '更新频道',
    stable: '稳定版',
    updating: '正在更新',
    websocketPortRequired: 'WebSocket 端口为必填项',
    websocketPortValidNumber: 'WebSocket 端口必须是有效数字',
    websocketPortInteger: 'WebSocket 端口必须是整数',
    websocketPortMin: 'WebSocket 端口必须至少为 50000',
    websocketPortMax: 'WebSocket 端口必须最多为 60000',
    openingLink: '正在打开链接',
    openingLinkDesc: '使用 {app} 打开链接。',
    failedToOpenLink: '打开链接失败',
    failedToOpenLinkDesc: '尝试打开链接时出错。',
    neoDlpExtension: 'NeoDLP 扩展',
    integrateNeoDlpBrowser: '将 NeoDLP 与您喜欢的浏览器集成',
    getNow: '立即获取',
    getChromeExtension: '获取 Chrome 扩展',
    fromChromeWebStore: '从 Chrome 网上应用店',
    getFirefoxExtension: '获取 Firefox 扩展',
    fromMozillaAddonsStore: '从 Mozilla 附加组件商店',
    linkNote: '* 这些链接仅使用对应的浏览器打开。点击链接前请确保浏览器已安装',
    websocketPort: 'WebSocket 端口',
    changeExtensionWebsocketPort: '更改扩展 WebSocket 服务器端口',
    websocketPortUpdated: 'WebSocket 端口已更新',
    websocketPortUpdatedDesc: 'WebSocket 端口已更改为 {port}',
    failedToChangeWebsocketPort: '更改 WebSocket 端口失败',
    failedToChangeWebsocketPortDesc: '尝试更改 WebSocket 端口时出错。请重试。',
    change: '更改',
    install: '安装',
    port: '端口',
    extensionWebsocketServer: '扩展 WebSocket 服务器',
    restarting: '正在重启...',
    running: '正在运行',
    websocketServerRestarted: 'WebSocket 服务器已重启',
    websocketServerRestartedDesc: 'WebSocket 服务器重启成功。',
    failedToRestartWebsocketServer: '重启 WebSocket 服务器失败',
    failedToRestartWebsocketServerDesc: '尝试重启 WebSocket 服务器时出错。请重试。',
    restart: '重启',
    neoDownloaderPlus: 'Neo Downloader Plus',
    loading: '加载中...',
    updateAvailableTooltip: '有更新可用',
    expandSidebarToViewUpdate: '(展开侧边栏查看更新)',
    updateAvailableTitle: '有更新可用',
    updateAvailableVersion: '有更新可用 (v{version})',
    aNewerVersionOfNeodlpAvailable: '有 NeoDLP 的新版本可用。请更新到最新版本以获得最佳体验。',
    application: '应用',
    extension: '扩展',
    resetSettingsToDefault: '重置设置为默认值？',
    areYouSureResetSettings: '确定要将所有设置重置为默认值吗？此操作无法撤销！',
    logs: '日志',
    logViewer: '日志查看器',
    monitorRealtimeAppLogs: '监控实时应用会话日志（最新在顶部）',
    noLogsToShow: '没有日志可显示！',
    clearLogs: '清除日志',
    copyLogs: '复制日志',
    potoken: 'Potoken',
    notifications: '通知',
    commands: '命令',
    debug: '调试',
    info: '信息',
    failedToSelectFolder: '选择文件夹失败',
    failedToSelectFolderDesc: '尝试选择下载文件夹时出错。请重试。',
    failedToSelectCookiesFile: '选择Cookies文件失败',
    failedToSelectCookiesFileDesc: '尝试选择Cookies文本文件时出错。请重试。',
    mostSettingsDisabled: '大多数设置将被禁用！',
    customCommandsWarning: '此功能仅供高级用户使用。启用它将禁用应用中的大多数其他设置。在使用此功能之前，请确保您知道自己在做什么，否则很容易出现问题。',
    customCommandsPlaceholder: '输入 yt-dlp 命令行参数（无需以 "yt-dlp" 开头，已传递的参数：url、输出路径、所选格式、所选字幕、播放列表项等）',
    noCustomCommands: '尚未添加自定义命令模板！',
    customCommandTemplates: '自定义命令模板',
    // Library
    open: '打开',
    reveal: '显示',
    remove: '移除',
    removeFromLibrary: '从媒体库中移除？',
    removeFromLibraryDesc: '确定要从媒体库中移除此下载吗？您还可以通过选中下方的复选框来删除已下载的文件。此操作无法撤销。',
    deleteDownloadedFile: '删除已下载的文件',
    noCompletedDownloads: '无已完成下载',
    noCompletedDownloadsDesc: '您还没有完成任何下载！完成一些下载后在此处查看 :)',
    spinUpNewDownload: '开始新的下载',
    noIncompleteDownloads: '无未完成下载',
    noIncompleteDownloadsDesc: '您已经全部赶上来了！坐下来放松一下，或者开始一个新的下载在此处查看 :)',
    revealingFile: '正在显示文件',
    revealingFileDesc: '正在 {app} 中显示文件。',
    openingFile: '正在打开文件',
    openingFileDesc: '正在使用 {app} 打开文件。',
    failedToRevealFile: '显示文件失败',
    failedToRevealFileDesc: '尝试显示文件时出错。',
    failedToOpenFile: '打开文件失败',
    failedToOpenFileDesc: '尝试打开文件时出错。',
    fileUnavailable: '文件不可用',
    fileUnavailableDesc: '您尝试 {action} 的文件不存在。',
    deletedFromDownloads: '已从下载中删除',
    deletedFromDownloadsDesc: '{prefix}"{title}" 的下载已成功删除。',
    removedFromDownloads: '已从下载中移除',
    removedFromDownloadsDesc: '{prefix}"{title}" 的下载已成功移除。',
    failedToDeleteDownload: '删除下载失败',
    failedToDeleteDownloadDesc: '尝试删除 {prefix}"{title}" 的下载时出错。',
    failedToRemoveDownload: '移除下载失败',
    failedToRemoveDownloadDesc: '尝试移除 {prefix}"{title}" 的下载时出错。',
    initiatingVideoSearch: '正在开始视频搜索',
    initiatingPlaylistSearch: '正在开始播放列表搜索',
    initiatingSearchDesc: '正在开始搜索所选的 {type}。',
    failedToInitiateSearch: '开始搜索失败',
    failedToInitiateSearchDesc: '尝试开始搜索时出错。',
    playlist: '播放列表',
    video: '视频',
    unknown: '未知',
    unknownPlaylist: '未知播放列表',
    unknownChannel: '未知频道',
    embeddedSubtitle: '内嵌字幕 ({id})',
    sponsorblockMarked: '赞助已标记 ({type})',
    sponsorblockRemoved: '赞助已移除 ({type})',
    multiaudio: '多音频',
    processing: '正在处理',
    errored: '出错了',
    speed: '速度',
    resumedDownload: '已恢复下载',
    resumedDownloadDesc: '下载已恢复，不久后将重新开始。',
    failedToResumeDownload: '恢复下载失败',
    failedToResumeDownloadDesc: '尝试恢复 "{title}" 的下载时出错。',
    resuming: '正在恢复',
    resume: '恢复',
    failedToRestartDownload: '重启下载失败',
    failedToRestartDownloadDesc: '尝试重启 "{title}" 的下载时出错。',
    retrying: '正在重试',
    retry: '重试',
    pausedDownload: '已暂停下载',
    pausedDownloadDesc: '下载已成功暂停。',
    failedToPauseDownload: '暂停下载失败',
    failedToPauseDownloadDesc: '尝试暂停 "{title}" 的下载时出错。',
    pausing: '正在暂停',
    pause: '暂停',
    canceledDownload: '已取消下载',
    canceledDownloadDesc: '"{title}" 的下载已取消。',
    failedToCancelDownload: '取消下载失败',
    failedToCancelDownloadDesc: '尝试取消 "{title}" 的下载时出错。',
    canceling: '正在取消',
  },
};
