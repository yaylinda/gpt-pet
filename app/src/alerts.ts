import * as Burnt from 'burnt';

export const errorAlert = (title: string, message: string) => {
    console.error(`[ERROR] ${message}`);
    Burnt.alert({
        title,
        preset: 'error',
    });
};
