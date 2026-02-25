'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useMemo, useState, useTransition } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Locale } from '@/i18n/i18n.config';
import CustomInput from '@/components/shared/form/CustomInput';
import CustomSelect from '@/components/shared/CustomSelect';
import DateRangePicker from '@/components/shared/DateRangePicker';

type City = {
    id: string;
    nameEn: string;
    nameIt: string;
};

type SuiteFilterProps = {
    locale: Locale;
    cities: City[];
};

type FormFilterFields = {
    CityId?: string;
    NumberOfAdults?: number;
    date?: {
        from: Date;
        to?: Date;
    };
};

function parseDateParam(value?: string | null): Date | undefined {
    if (!value) return undefined;
    const parts = value.split('-').map(Number);
    if (parts.length !== 3 || parts.some(Number.isNaN)) return undefined;
    const [year, month, day] = parts;
    return new Date(year, month - 1, day);
}

function FilterFields({
    locale,
    cityItems,
}: {
    locale: Locale;
    cityItems: { label: string; value: string }[];
}) {
    const t = useTranslations('pages.home.filterSection');
    const isEnglish = locale === 'en';

    return (
        <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-4 items-end">
            <CustomSelect
                placeholder={t('Select destination')}
                label={isEnglish ? 'City' : 'المدينة'}
                fieldName="CityId"
                items={cityItems}
                className="w-full"
            />

            <DateRangePicker

                label={isEnglish ? 'Date' : 'Data'}
                placeholder={isEnglish ? 'Add date' : 'Aggiungi data'}
                fieldName="date"
                className="w-full"
                rules={{
                    required: isEnglish ? 'Date is required' : 'La data è obbligatoria',
                    validate: (value: { from: Date; to?: Date } | undefined) => {
                        if (!value || !value.from) {
                            return isEnglish ? 'Please select a date' : 'Seleziona una data';
                        }
                        return true;
                    },
                }}
                requiredMessage={isEnglish ? 'Date is required' : 'La data è obbligatoria'}
            />

            <CustomInput
                placeholder={isEnglish ? 'Enter number of guests' : 'Inserisci numero di ospiti'}
                label={"guests"}
                fieldName="NumberOfAdults"
                type="number"
                className=' py-3'
            />
        </div>
    );
}

export default function CustomFilter({ locale, cities }: SuiteFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations('pages.home.filterSection');
    const isEnglish = locale === 'en';

    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const initialDate = useMemo(() => {
        const from =
            parseDateParam(searchParams.get('DateFrom')) ||
            parseDateParam(searchParams.get('dateFrom')) ||
            parseDateParam(searchParams.get('date'));
        const to =
            parseDateParam(searchParams.get('DateTo')) ||
            parseDateParam(searchParams.get('dateTo'));

        if (from && to && to >= from) return { from, to };
        if (from) return { from };
        return undefined;
    }, [searchParams]);

    const initialCityId = searchParams.get('CityId') || undefined;
    const initialNumberOfAdults = searchParams.get('NumberOfAdults')
        ? Number(searchParams.get('NumberOfAdults'))
        : undefined;

    const form = useForm<FormFilterFields>({
        defaultValues: {
            CityId: initialCityId,
            NumberOfAdults: initialNumberOfAdults,
            date: initialDate,
        },
    });

    useEffect(() => {
        form.setValue('date', initialDate);
        if (initialCityId !== undefined) {
            form.setValue('CityId', initialCityId);
        }
        if (initialNumberOfAdults !== undefined) {
            form.setValue('NumberOfAdults', initialNumberOfAdults);
        }
    }, [form, initialDate, initialCityId, initialNumberOfAdults]);

    const cityItems = cities.map((city) => ({
        label: isEnglish ? city.nameEn : city.nameIt,
        value: city.id,
    }));

    const handleSearch = form.handleSubmit((values) => {
        const params = new URLSearchParams();

        if (values.CityId) params.set('CityId', values.CityId);
        if (values.NumberOfAdults) {
            params.set('NumberOfAdults', values.NumberOfAdults.toString());
        } else {
            params.set('NumberOfAdults', '1');
        }
        if (values.date?.from) params.set('DateFrom', format(values.date.from, 'yyyy-MM-dd'));
        if (values.date?.to) params.set('DateTo', format(values.date.to, 'yyyy-MM-dd'));
        params.set('PageNumber', '1');
        params.set('PageSize', '12');

        startTransition(() => {
            setOpen(false);
            router.push(`/${locale}/search-suites?${params.toString()}`);
            router.refresh();
        });
    });

    return (
        <FormProvider {...form}>
            <form className="max-w-[638px] m-a shadow-sm rounded-[100px] p-2">
                {/* ✅ Desktop: inline filter */}
                <div className="hidden lg:flex">
                    <FilterFields locale={locale} cityItems={cityItems} />

                    <Button
                        type="button"
                        onClick={handleSearch}
                        variant="link"
                        disabled={isPending}
                        className="bg-neutral-900 px-4 py-2 rounded-full text-neutral-50 cursor-pointer"
                    >
                        {isPending ? (
                            <Loader2 className="size-5 animate-spin" />
                        ) : (
                            <Search className="w-6 h-6" />
                        )}
                    </Button>
                </div>

                {/* ✅ Mobile/Tablet: open from dialog */}
                <div className="lg:hidden">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button
                                type="button"
                                className="w-full justify-between hover:bg-transparent cursor-pointer focus:bg-transparent border-b rounded-none border-primary-50 bg-transparent text-primary-50"
                            >
                                <span className="flex items-center gap-2">
                                    {isEnglish ? 'Search' : 'Cerca'}
                                </span>
                                <Search className="w-6 h-6" />
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="w-[92vw] max-w-[560px] rounded-xl bg-[#00000040] border border-white/10 text-primary-50">
                            <DialogHeader>
                                <DialogTitle className="font-libre text-2xl">
                                    {isEnglish ? 'Search' : 'Cerca'}
                                </DialogTitle>
                            </DialogHeader>

                            <div className="mt-2">
                                <FilterFields locale={locale} cityItems={cityItems} />

                                <Button
                                    type="button"
                                    onClick={handleSearch}
                                    disabled={isPending}
                                    className="mt-6 w-full bg-primary-500 hover:bg-primary-400 text-neutral-900"
                                >
                                    {t('search')}
                                    {isPending ? (
                                        <Loader2 className="size-5 animate-spin" />
                                    ) : (
                                        <Search className="w-6 h-6" />
                                    )}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </form>
        </FormProvider>
    );
}
