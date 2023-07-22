import React from 'react';
import {Fieldset, Input, Label, SizableText} from 'tamagui';
import type { InputProps } from 'tamagui/src/views/Input';

interface TextInputWithLabelProps {
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onUpdate: (value: string) => void;
    disabled: boolean;
    horizontal?: boolean;
    errorMessage: string;
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
    errorMessage,
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
            {errorMessage && (
                <SizableText
                    // @ts-ignore
                    fontFamily='Inter'
                    paddingLeft='$2'
                    marginTop='$2'
                    fontSize={12}
                    color='red'
                >
                    {errorMessage}
                </SizableText>
            )}
        </Fieldset>
    );
};

export default TextInputWithLabel;
