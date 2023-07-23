import {
    Baby,
    Bird,
    Cat,
    Dog,
    Egg,
    Fish,
    Ghost,
    PersonStanding,
    Rat,
    Skull,
} from '@tamagui/lucide-icons';
import type { NamedExoticComponent } from 'react';

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const USERNAME_REGEX = /^[a-zA-Z0-9._-]{4,50}$/;

export const FULL_USERNAME_REGEX = /^[A-Za-z0-9]+#\d{4}$/;

export const MIN_DISPLAY_NAME_LENGTH = 3;

export const PET_ICON_MAP: Record<string, NamedExoticComponent> = {
    Bird: Bird,
    Cat: Cat,
    Dog: Dog,
    Fish: Fish,
    Rat: Rat,
    Egg: Egg,
    Ghost: Ghost,
    Skull: Skull,
    Baby: Baby,
    PersonStanding: PersonStanding,
};

export const NUM_NATURES = 3;

export const PET_NATURES = [
    'Adamant',
    'Bashful',
    'Bold',
    'Brave',
    'Calm',
    'Careful',
    'Docile',
    'Gentle',
    'Hardy',
    'Hasty',
    'Impish',
    'Jolly',
    'Lax',
    'Lonely',
    'Mild',
    'Modest',
    'Naive',
    'Naughty',
    'Quiet',
    'Quirky',
    'Rash',
    'Relaxed',
    'Sassy',
    'Serious',
    'Timid',
];
