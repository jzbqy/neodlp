export type Language = 'en' | 'zh-CN';

export interface Translation {
  // Navigation
  downloader: string;
  library: string;
  settings: string;
  
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
  
  // Settings - SponsorBlock
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
  
  // Common
  current: string;
  language: string;
  selectLanguage: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    downloader: 'Downloader',
    library: 'Library',
    settings: 'Settings',
    
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
    aria2Desc: 'Use aria2c as external downloader (recommended only if you are experiencing too slow download speeds with native downloader, you need to install aria2 via homebrew if you are on macOS to use this feature)',
    
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
    cleanupTempDownloads: 'Clean up temporary downloads (broken, cancelled, paused downloads)',
    filenameTemplate: 'Filename Template',
    setFilenameTemplate: 'Set the template for naming downloaded files (download id, file extension and playlist index will be auto-appended, changing template may cause paused downloads to re-start from beginning)',
    sanitizeFilenames: 'Sanitize Filenames',
    sanitizeFilenamesDesc: 'Make filenames windows-compatible, allow only ASCII characters and replace spaces with underscore (recommended, disabling it may cause issue with some downloads, also it may cause paused downloads to re-start from beginning)',
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
    alwaysReencodeVideoDesc: 'Instead of remuxing (simple container change) always re-encode the video to the target format with best compatible codecs (better compatibility, takes longer processing time)',
    auto: 'Auto (Default)',
    
    embedMetadata: 'Embed Metadata',
    embedMetadataDesc: 'Whether to embed metadata in video/audio files (info, chapters)',
    embedThumbnail: 'Embed Thumbnail',
    embedThumbnailDesc: 'Whether to embed thumbnail in video/audio files (as cover art)',
    video: 'Video',
    audio: 'Audio',
    
    proxy: 'Proxy',
    proxyDesc: 'Use proxy for downloads, Unblocks blocked sites in your region (download speed may affect, some sites may not work)',
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
    forceIpv: 'Force IPV',
    useIpv4Only: 'Use IPv4 Only',
    useIpv6Only: 'Use IPv6 Only',
    forced: 'Forced',
    
    cookiesSettings: 'Cookies',
    cookiesDesc: 'Use cookies to access exclusive/private (login-protected) contents from sites (use wisely, over-use can even block/ban your account)',
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
    sponsorblockDesc: 'Use sponsorblock to remove/mark unwanted segments in videos (sponsorships, intros, outros, etc.)',
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
    selfPromotion: 'Self Promotion',
    musicOfftopic: 'Music Offtopic',
    preview: 'Preview',
    filler: 'Filler',
    chapter: 'Chapter',
    hook: 'Hook',
    
    current: 'Current',
    language: 'Language',
    selectLanguage: 'Select Language',
  },
  'zh-CN': {
    downloader: '下载器',
    library: '媒体库',
    settings: '设置',
    
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
    aria2Desc: '使用 aria2c 作为外部下载器（仅建议在原生下载器速度过慢时使用，macOS 用户需通过 homebrew 安装 aria2）',
    
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
    sanitizeFilenamesDesc: '使文件名兼容 Windows，仅允许 ASCII 字符并用下划线替换空格（推荐，禁用可能导致某些下载问题，也可能导致暂停的下载从头开始）',
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
    sponsorblockDesc: '使用 sponsorblock 移除/标记视频中的不需要片段（赞助、片头、片尾等）',
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
    
    current: '当前',
    language: '语言',
    selectLanguage: '选择语言',
  },
};
