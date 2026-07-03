import { Service } from '@/types'

export const services: Service[] = [
  {
    slug: 'vinyl-pvc',
    title: 'Vinyl a PVC podlahy',
    shortDesc: 'Moderní LVT a vinylové dílce, pokládka v rolích i lamelách.',
    description:
      'Specializujeme se na pokládku moderních vinylových podlah LVT (luxusní vinylové dílce), PVC krytin v rolích i dílcích. Vinyl je odolný, snadno udržovatelný a vhodný jak pro bytové, tak komerční prostory.',
    icon: 'layers',
    features: [
      'Pokládka LVT vinylových dílců a lamel',
      'PVC krytiny v rolích – bytové i komerční',
      'Pokládka click systémem i celoplošným lepením',
      'Antistatické a elektrostatické PVC čtverce',
      'Vyřezávání obrazců dle přání zákazníka',
      'Vytahované sokly a přechodové lišty',
    ],
  },
  {
    slug: 'drevo-parkety',
    title: 'Dřevěné podlahy a parkety',
    shortDesc: 'Masivní dřevo, třívrstvé podlahy, parkety – pokládka i broušení.',
    description:
      'Dřevěné podlahy jsou nadčasovou volbou pro každý interiér. Pokládáme masivní parkety, třívrstvé a dvouvrstvé dřevěné podlahy, prkenné podlahy. Nabízíme také broušení, lakování a olejování stávajících podlah.',
    icon: 'tree-pine',
    features: [
      'Pokládka masivních dřevěných podlah',
      'Třívrstvé a dvouvrstvé plovoucí podlahy',
      'Dřevěné a vlysové parkety',
      'Broušení a lakování parket',
      'Olejování a voskování dřeva',
      'Renovace a opravy starých parket',
      'Zakládání a renovace podlahových trámů',
    ],
  },
  {
    slug: 'laminate',
    title: 'Laminátové podlahy',
    shortDesc: 'Odolné plovoucí podlahy vhodné do bytů i komerčních prostor.',
    description:
      'Laminátové podlahy nabízejí výborný poměr ceny a kvality. Jsou odolné proti poškrábání, vlhkosti i chemikáliím. Vhodné pro podlahové topení, jednoduché na pokládku i údržbu.',
    icon: 'square-stack',
    features: [
      'Pokládka plovoucích laminátových podlah',
      'Vhodné pro podlahové topení',
      'Bytové i komerční laminátové podlahy',
      'Pokládka OSB, Durelis a QSB desek',
      'Správný výběr podloženky pod laminát',
    ],
  },
  {
    slug: 'koberce',
    title: 'Koberce',
    shortDesc: 'Pokládka bytových i zátěžových koberců, čištění a údržba.',
    description:
      'Pokládáme koberce všech typů – bytové, zátěžové, ze syntetických i přírodních vláken. Odborně poradíme s výběrem správného typu koberce pro dané prostory a zajistíme profesionální pokládku.',
    icon: 'grip',
    features: [
      'Pokládka bytových koberců',
      'Zátěžové koberce pro komerční prostory',
      'Koberce z přírodních vláken (vlna, bavlna)',
      'Vpichované koberce Nadelvlies',
      'Čištění a údržba koberců',
    ],
  },
  {
    slug: 'linoleum',
    title: 'Linoleum a Marmoleum',
    shortDesc: '100% přírodní podlahovina Forbo Marmoleum – ekologická volba.',
    description:
      'Jako certifikovaný partner Forbo Marmoleum nabízíme pokládku přírodního linolea a Marmolea. Jde o 100% ekologickou podlahovinu vyrobenou z lněného oleje a přírodních pigmentů. Vydrží desítky let a dá se brousit.',
    icon: 'leaf',
    features: [
      'Pokládka přírodního linolea v rolích',
      'Marmoleum Forbo – certifikovaný partner',
      'Artoleum – designové přírodní podlahoviny',
      'Vyřezávání vzorů a ornamentů',
      'Vytahované sokly z linolea',
      'Renovace a leštění starého linolea',
    ],
  },
  {
    slug: 'renovace-opravy',
    title: 'Renovace a opravy',
    shortDesc: 'Odborné posouzení, opravy, broušení a renovace všech typů podlah.',
    description:
      'Provádíme kompletní renovace všech typů podlah. Od odborného posouzení stávajícího stavu, měření vlhkosti, přes vyrovnání a stěrkování podkladu, až po finální pokládku nebo renovaci.',
    icon: 'tool',
    features: [
      'Odborné posouzení podlahy s písemným vyjádřením',
      'Měření vlhkosti (elektro metoda, CM metoda)',
      'Broušení a odstranění starých podkladů',
      'Vyrovnání, nivelace a stěrkování',
      'Renovace schodů (domy, panelové domy)',
      'Opravy parket a dřevěných podlah',
      'Údržba a leštění povrchů',
      'Zaměření a cenová kalkulace zdarma',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
