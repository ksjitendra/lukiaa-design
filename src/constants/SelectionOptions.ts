import { SelectionElementType } from '../types/selectionOptionsTypes';
import { CustomImages } from '../assets/images';
import { SkintoneOption, SkinundertoneOption } from '../types/outfitDataType';

export const bodyShapeOptions: SelectionElementType[] = [
  {id: 'triangle', label: 'Triangle', emoji: CustomImages.triangle},
  {id: 'rectangle', label: 'Rectagle', emoji: CustomImages.square},
  {
    id: 'invertedTriangle',
    label: 'Inverted Triangle',
    emoji: CustomImages.downTriangle,
  },
  {id: 'oval', label: 'Oval', emoji: CustomImages.ellipse},
  {id: 'trapzoid', label: 'Trapezoid', emoji: CustomImages.pentagone},
];

export const femaleBodySizeOptions: SelectionElementType[] = [
  {id: 'slim', label: 'Slim', emoji: ''},
  {id: 'average', label: 'Average', emoji: ''},
  {id: 'athletic', label: 'Athletic', emoji: ''},
  {id: 'curvy', label: 'Curvy', emoji: ''},
  {id: 'plusSize', label: 'Plus Size', emoji: ''},
];

export const maleBodySizeOptions: SelectionElementType[] = [
  {id: 'slim', label: 'Slim', emoji: ''},
  {id: 'average', label: 'Average', emoji: ''},
  {id: 'athletic', label: 'Athletic', emoji: ''},
  {id: 'heavyset', label: 'Heavyset', emoji: ''},
  {id: 'muscular', label: 'Muscular/Bulked', emoji: ''},
];

export const femaleBodyShapeOptions: SelectionElementType[] = [
  {id: 'female_apple', label: 'Apple', emoji: CustomImages.femaleShapeApple},
  {id: 'female_brick', label: 'Brick', emoji: CustomImages.femaleShapeBrick},
  {id: 'female_column', label: 'Column', emoji: CustomImages.femaleShapeColumn},
  {
    id: 'female_inverted_triangle',
    label: 'Inverted Triangle',
    emoji: CustomImages.femaleShapeInvertedTriangle,
  },
  {id: 'female_pear', label: 'Pear', emoji: CustomImages.femaleShapePear},
  {id: 'female_petite', label: 'Petite', emoji: CustomImages.femaleShapePetite},
  {
    id: 'female_hour_glass',
    label: 'Hourglass',
    emoji: CustomImages.femaleShapeHourGlass,
  },
  {
    id: 'female_full_hour_glass',
    label: 'Full Hourglass',
    emoji: CustomImages.femaleShapeFullHourGlass,
  },
];

export const maleBodyShapeOptions: SelectionElementType[] = [
  {id: 'male_column', label: 'Column', emoji: CustomImages.maleShapeColumn},
  {
    id: 'male_trapezium',
    label: 'Trapezium',
    emoji: CustomImages.maleShapeTrapezium,
  },
  {
    id: 'male_circle',
    label: 'Circle',
    emoji: CustomImages.maleShapeCircle,
  },
  {id: 'male_oval', label: 'Oval', emoji: CustomImages.maleShapeOval},
  {
    id: 'male_rectangle',
    label: 'Retangle',
    emoji: CustomImages.maleShapeRectangle,
  },
  {
    id: 'male_square',
    label: 'Square',
    emoji: CustomImages.maleShapeSquare,
  },
  {
    id: 'male_inverted_triangle',
    label: 'Inverted Triangle',
    emoji: CustomImages.maleShapeInvertedTriangle,
  },
  {
    id: 'male_triangle',
    label: 'Triangle',
    emoji: CustomImages.maleShapeTriangle,
  },
];

export const genderTypes = ['male', 'female'];

export const ageTypes = ['18-24', '25-34', '35-44', '45-54', '55+'];

export const professionTypes = ['Student', 'Professional'];

export const BrandsDealInOptions = [
  {id: 'affordable', label: 'Affordable', emoji: CustomImages.money},
  {id: 'premium', label: 'Premium', emoji: CustomImages.premium},
  {id: 'luxury', label: 'Luxury', emoji: CustomImages.luxury},
];

export const OutfitStruggleOptions = [
  {
    id: 'collegeDailyLife',
    label: 'College Daily Life',
    emoji: CustomImages.college,
  },
  {
    id: 'dayTodayOffice',
    label: 'Day-to-Day Office',
    emoji: CustomImages.office,
  },
  {id: 'nightOut', label: 'Night Out', emoji: CustomImages.moon},
  {id: 'brunchOuting', label: 'Brunch Outing', emoji: CustomImages.brunch}, // Fixed typo
  {id: 'wedding', label: 'Wedding', emoji: CustomImages.wedding},
  {id: 'parties', label: 'Parties', emoji: CustomImages.party},
  {id: 'date', label: 'Date', emoji: CustomImages.date},
  {id: 'gym', label: 'Gym', emoji: CustomImages.gym},
  {id: 'birthday', label: 'Birthday', emoji: CustomImages.birthday},
];

export const SkintoneOptions: SkintoneOption[] = [
  {
    value: 1,
    color: '#FBC3BC',
    type: 'Fair',
  },
  {
    value: 2,
    color: '#ECA37D',
    type: 'Light',
  },
  {
    value: 3,
    color: '#ED9A54',
    type: 'Medium',
  },
  {
    value: 4,
    color: '#C87A34',
    type: 'Olive',
  },
  {
    value: 5,
    color: '#84452B',
    type: 'Tan',
  },
  {
    value: 6,
    color: '#552B1A',
    type: 'Dark',
  },
];

export const SkinundertoneOptions: SkinundertoneOption[] = [
  {
    id: 'warm',
    title: 'Warm',
    subtitle: 'Yellow, peachy, or golder undertones',
  },
  {
    id: 'cool',
    title: 'Cool',
    subtitle: 'Pink, red, or blue undertones',
  },
  {
    id: 'neutral',
    title: 'Neutral',
    subtitle: 'Mix or warm and cool undertones',
  },
];


