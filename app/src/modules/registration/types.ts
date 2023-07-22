export enum Step {
    NAME = 'NAME',
    PET_TYPE = 'PET_TYPE',
    PET_NATURE = 'PET_NATURE',
}

export interface RegistrationStepProps {
    nextStep: () => void;
    prevStep?: () => void;
}
