import * as Burnt from 'burnt';

export const errorAlert = (title: string, message: string) => {
    Burnt.alert({
        title,
        message,
        preset: 'error',
        duration: 2,
    });
};
