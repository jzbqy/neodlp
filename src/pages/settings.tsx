import Heading from "@/components/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettingsPageStatesStore } from "@/services/store";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { useTheme } from "@/providers/themeProvider";
import { useSettings } from "@/helpers/use-settings";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ExtensionSettings } from "@/components/pages/settings/extensionSettings";
import { ApplicationSettings } from "@/components/pages/settings/applicationSettings";
import usePotServer from "@/helpers/use-pot-server";
import { useI18n } from "@/i18n/i18nProvider";

export default function SettingsPage() {
    const { t } = useI18n();
    const { setTheme } = useTheme();

    const activeTab = useSettingsPageStatesStore(state => state.activeTab);
    const setActiveTab = useSettingsPageStatesStore(state => state.setActiveTab);

    const isUsingDefaultSettings = useSettingsPageStatesStore(state => state.isUsingDefaultSettings);
    const isRunningPotServer = useSettingsPageStatesStore(state => state.isRunningPotServer);
    const appTheme = useSettingsPageStatesStore(state => state.settings.theme);
    const appColorScheme = useSettingsPageStatesStore(state => state.settings.color_scheme);

    const { resetSettings } = useSettings();
    const { stopPotServer } = usePotServer();

    useEffect(() => {
        const updateTheme = async () => {
            setTheme(appTheme, appColorScheme);
        }
        updateTheme().catch(console.error);
    }, [appTheme, appColorScheme]);

    return (
        <div className="container mx-auto p-4 space-y-4 min-h-screen">
            <Heading title={t.settingsTitle} description={t.settingsDescription} />
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="w-full flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="app">{t.application}</TabsTrigger>
                        <TabsTrigger value="extension">{t.extension}</TabsTrigger>
                    </TabsList>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                            className="w-fit"
                            variant="destructive"
                            size="sm"
                            disabled={isUsingDefaultSettings}
                            >
                                <RotateCcw className="h-4 w-4" />
                                {t.reset}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t.resetSettingsToDefault}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t.areYouSureResetSettings}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
                                <AlertDialogAction onClick={
                                    async () => {
                                        resetSettings();
                                        if (isRunningPotServer) {
                                            await stopPotServer();
                                        }
                                    }
                                }>{t.reset}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <TabsContent value="app">
                    <ApplicationSettings />
                </TabsContent>
                <TabsContent value="extension">
                    <ExtensionSettings />
                </TabsContent>
            </Tabs>
        </div>
    )
}
