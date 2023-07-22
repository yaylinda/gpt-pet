import * as Burnt from 'burnt';

export const errorToast = (title: string, message: string) => {
    Burnt.toast({
        title,
        preset: "error",
        message,
        haptic: 'error'
    });
};
