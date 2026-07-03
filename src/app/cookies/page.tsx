import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui/AnimatedSection'
import pageStyles from '@/styles/pageHeader.module.css'
import styles from './page.module.css'
import { CONTACT, SITE_NAME, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Zásady ochrany osobních údajů a cookies',
  description: 'Informace o zpracování osobních údajů a používání souborů cookies na webu Podlahy Perk.',
  robots: { index: false, follow: false },
}

export default function CookiesPage() {
  const updated = '1. 7. 2025'

  return (
    <>
      <div className={pageStyles.pageHeader}>
        <div className={`container ${pageStyles.content}`}>
          <AnimatedSection>
            <p className={pageStyles.eyebrow}>Právní informace</p>
            <h1 className={pageStyles.heading}>Zásady ochrany<br />osobních údajů</h1>
            <p className={pageStyles.desc}>
              Informace o tom, jak zpracováváme vaše osobní údaje
              a jaké cookies používáme na tomto webu.
            </p>
          </AnimatedSection>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className={styles.content}>

            <AnimatedSection>
              <p className={styles.updated}>Poslední aktualizace: {updated}</p>
            </AnimatedSection>

            <AnimatedSection className={styles.block}>
              <h2 className={styles.heading}>1. Správce osobních údajů</h2>
              <p>Správcem osobních údajů je:</p>
              <div className={styles.infoBox}>
                <p><strong>{SITE_NAME} – Martin Perk</strong></p>
                <p>{CONTACT.billingAddress}</p>
                <p>IČ: {CONTACT.ico} · DIČ: {CONTACT.dic}</p>
                <p>Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
                <p>Telefon: <a href={`tel:${CONTACT.phone1.replace(/\s/g, '')}`}>{CONTACT.phone1}</a></p>
              </div>
            </AnimatedSection>

            <AnimatedSection className={styles.block}>
              <h2 className={styles.heading}>2. Kontaktní formulář</h2>
              <p>
                Při odeslání kontaktního formuláře zpracováváme následující osobní údaje:
                jméno a příjmení, telefonní číslo, emailová adresa a obsah zprávy.
              </p>
              <p>
                <strong>Účel zpracování:</strong> Výhradně za účelem odpovědi na váš dotaz
                nebo zpracování poptávky. Data nejsou předávána třetím stranám ani
                používána k marketingovým účelům.
              </p>
              <p>
                <strong>Právní základ:</strong> Oprávněný zájem správce (čl. 6 odst. 1 písm. f GDPR)
                — odpověď na dotaz iniciovaný subjektem údajů.
              </p>
              <p>
                <strong>Doba uchování:</strong> Po dobu nezbytně nutnou pro vyřízení dotazu,
                maximálně 1 rok od přijetí zprávy.
              </p>
              <p>
                <strong>Zpracovatel emailů:</strong> Pro odesílání emailů využíváme službu{' '}
                <a href="https://resend.com" target="_blank" rel="noopener noreferrer">Resend</a>{' '}
                (Resend Inc., USA). Zpracování probíhá na základě standardních smluvních doložek EU.
              </p>
            </AnimatedSection>

            <AnimatedSection className={styles.block}>
              <h2 className={styles.heading}>3. Soubory cookies</h2>
              <p>
                Soubory cookies jsou malé textové soubory ukládané do vašeho prohlížeče.
                Tento web rozlišuje nezbytné a volitelné cookies.
              </p>

              <h3 className={styles.subheading}>3.1 Nezbytné cookies</h3>
              <p>
                Tyto cookies jsou nutné pro fungování webu a nelze je odmítnout.
              </p>
              <div className={styles.table}>
                <div className={styles.tableRow}>
                  <span className={styles.tableKey}>cookie_consent</span>
                  <span className={styles.tableVal}>Ukládá váš souhlas nebo odmítnutí cookies. Platnost: 1 rok. Správce: {SITE_NAME}.</span>
                </div>
              </div>

              <h3 className={styles.subheading}>3.2 Volitelné cookies (pouze se souhlasem)</h3>

              <p><strong>Adobe Fonts (Typekit)</strong></p>
              <p>
                Pro zobrazení písma Avenir Next LT Pro využíváme službu Adobe Fonts
                od společnosti Adobe Inc. Při načtení fontu může Adobe nastavit cookies
                nebo zaznamenat IP adresu za účelem licenčního ověření.
              </p>
              <div className={styles.table}>
                <div className={styles.tableRow}>
                  <span className={styles.tableKey}>at-rand, sstk_*</span>
                  <span className={styles.tableVal}>Cookies Adobe Fonts pro ověření licence a analýzu. Správce: Adobe Inc. Více na <a href="https://www.adobe.com/cz/privacy.html" target="_blank" rel="noopener noreferrer">adobe.com/privacy</a>.</span>
                </div>
              </div>

              <p style={{ marginTop: '1rem' }}><strong>Instagram (pouze po napojení feedu)</strong></p>
              <p>
                Pokud je aktivní Instagram feed, načítáme příspěvky přes Instagram Graph API
                (Meta Platforms Ireland Ltd.). Meta může při tomto požadavku zpracovávat
                technické údaje včetně IP adresy. Více na{' '}
                <a href="https://privacycenter.instagram.com" target="_blank" rel="noopener noreferrer">
                  privacycenter.instagram.com
                </a>.
              </p>

            </AnimatedSection>

            <AnimatedSection className={styles.block}>
              <h2 className={styles.heading}>4. Vaše práva</h2>
              <p>Jako subjekt údajů máte právo na:</p>
              <ul className={styles.list}>
                <li>přístup k osobním údajům, které o vás zpracováváme</li>
                <li>opravu nebo výmaz osobních údajů</li>
                <li>omezení zpracování</li>
                <li>přenositelnost údajů</li>
                <li>odvolání souhlasu (souhlas s cookies lze odvolat smazáním záznamu v prohlížeči)</li>
                <li>podání stížnosti u Úřadu pro ochranu osobních údajů (<a href="https://www.uoou.cz" target="_blank" rel="noopener noreferrer">uoou.cz</a>)</li>
              </ul>
              <p>
                Pro uplatnění práv nás kontaktujte na{' '}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              </p>
            </AnimatedSection>

            <AnimatedSection className={styles.block}>
              <h2 className={styles.heading}>5. Správa cookies v prohlížeči</h2>
              <p>
                Svůj souhlas s cookies můžete kdykoli odvolat smazáním záznamu
                <code className={styles.code}>cookie_consent</code> v Local Storage vašeho prohlížeče
                (DevTools → Application → Local Storage → {SITE_URL}).
                Při příští návštěvě se banner zobrazí znovu.
              </p>
              <p>
                Cookies třetích stran lze blokovat také přímo v nastavení prohlížeče
                nebo pomocí rozšíření jako uBlock Origin.
              </p>
            </AnimatedSection>

            <AnimatedSection className={styles.block}>
              <h2 className={styles.heading}>6. Změny zásad</h2>
              <p>
                Tyto zásady můžeme příležitostně aktualizovat. O podstatných změnách
                vás informujeme prostřednictvím oznámení na webu. Datum poslední
                aktualizace je uvedeno v záhlaví tohoto dokumentu.
              </p>
            </AnimatedSection>

          </div>
        </div>
      </section>
    </>
  )
}
