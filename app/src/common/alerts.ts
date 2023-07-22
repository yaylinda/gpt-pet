import * as Burnt from 'burnt';

export const errorToast = (title: string, message: string) => {
    Burnt.alert({
        title,
        message,
        preset: "error",
        duration: 4,
    });
};
