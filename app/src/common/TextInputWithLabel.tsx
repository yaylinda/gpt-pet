import React from 'react';
import { Fieldset, Input, Label } from 'tamagui';
import type { InputProps } from 'tamagui/src/views/Input';

interface TextInputWithLabelProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onUpdate: (value: string) => void;
    disabled: boolean;
    horizontal?: boolean;
    additionalProps?: InputProps;
}

const TextInputWithLabel = ({
    id,
    label,
    placeholder,
    value,
    onUpdate,
    disabled,
    horizontal = false,
    additionalProps = {},
}: TextInputWithLabelProps) => {
    return (
        <Fieldset horizontal={horizontal}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                size="$4"
                placeholder={placeholder}
                value={value}
                onChangeText={onUpdate}
                disabled={disabled}
                {...additionalProps}
            />
        </Fieldset>
    );
};

TextInputWithLabel.displayName = 'TextInputWithLabel';

export default TextInputWithLabel;
