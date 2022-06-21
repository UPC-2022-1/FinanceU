/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'calculator',
        title: 'Calculadora',
        type: 'basic',
        icon: 'heroicons_outline:calculator',
        link: '/example',
    },
    {
        id: 'history',
        title: 'Historial',
        type: 'basic',
        icon: 'heroicons_outline:archive',
        link: '/history',
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'calculator',
        title: 'Calculadora',
        type: 'basic',
        icon: 'heroicons_outline:calculator',
        link: '/calculator',
    },
    {
        id: 'history',
        title: 'Historial',
        type: 'basic',
        icon: 'heroicons_outline:archive',
        link: '/history',
    },
];
