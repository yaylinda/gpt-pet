import * as Burnt from 'burnt';
import * as Haptics from 'expo-haptics';

export const errorAlert = (title: string, message: string) => {
    console.error(`[ERROR] ${message}`);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Burnt.alert({
        title,
        preset: 'error',
    });
};
