import forum1 from '@/assets/images/forum1.png'
import forum2 from '@/assets/images/forum2.png'
import forum3 from '@/assets/images/forum3.png'
import Plakat1 from '@/assets/images/Plakat1.png'
import Plakat2 from '@/assets/images/Plakat2.png'
import Plakat3 from '@/assets/images/Plakat3.jpg'
import catSmall from '@/assets/images/cat-small.jpg'
import catWhite from '@/assets/images/cat-white.jpg'
import catBowl from '@/assets/images/cat-bowl.jpg'
import catSmirk from '@/assets/images/cat-smirk.jpg'
import dog from '@/assets/images/dog.jpg'
import bird from '@/assets/images/bird.jpg'
import guinea from '@/assets/images/guinea.jpg'

export default [
  {
    title: 'DMP-Day Plakatauswertung',
    image: forum1,
    author: 'Andreas Teufel',
    username: 'andreasteufel',
    usergroup: 'Studierende',
    date: 1526651549211,
    read: false,
    id: '6ed11d9b-1c2a-4ad7-948a-b491467534e1',
    comments: [
      {
        gallery: [],
        content: 'Super, freu mich drauf!',
        username: 'jonaskuske',
      },
      {
        gallery: [],
        content:
          'Das mittlere sieht cool aus! Bin gespannt ob ich in die Top 10 gekommen bin. Hab ja versucht mal etwas anderes zu machen, aber das kann auch nach hinten losgehen... Außerdem rede ich jetzt noch ganz viel mehr damit mehrere Zeilen Text entstehen. :)',
        username: 'matthiaswengel',
      },
      {
        gallery: [Plakat1, Plakat2],
        content:
          'Zwar zu spät für den Wettbewerb, aber hab auch rumprobiert, was meint ihr?',
        username: 'sarahtau',
      },
      {
        gallery: [],
        content:
          'Sieht gut aus! Hättest Chancen gehabt, wärst du schneller gewesen 😜',
        username: 'jonaskuske',
      },
    ],
    content: `Ab morgen gibt es die Resultate des Plakatwettbewerbs für den DMP-Day!
      Die Plakate werden in Haus T ausgestellt, ein paar der Plakate hab ich aber auch schon mal hier hochgeladen,
      damit ihr einen kleinen Vorgesschmack bekommt. Zur Eröffnung werden auch die Gewinner verkündet - aber alle Beiträge waren super, also danke an alle, die mitgemacht haben!`,
    gallery: [Plakat1, Plakat2, Plakat3],
    subforum: 'Ankündigungen',
  },
  {
    title: '#Caturday! Bilder von euren Haustieren hier her!',
    image: forum2,
    author: 'Jonas Kuske',
    username: 'jonaskuske',
    usergroup: 'Alle',
    date: new Date(),
    read: true,
    id: '7eab7eb8-aee4-4229-a4ce-867f5e007781',
    comments: [
      {
        username: 'sarahtau',
        content: 'Die hier ist soooooo süß...',
        gallery: [catWhite],
      },
      {
        username: 'axelschmaxel',
        content: 'Da kann ich locker mithalten :P',
        gallery: [catBowl, catSmirk],
      },
      {
        username: 'maraschmidt',
        content: 'Ich mag meinen Papagei...',
        gallery: [bird],
      },
      {
        username: 'tomlöhner',
        content:
          'Ist (leider) nicht meins, aber das Meerschweinchen von meiner Freundin ist auch super',
        gallery: [guinea],
      },
    ],
    content: `Wie jeden Samstag ist wieder jedmögliche Form von <b>#catcontent</b> gefragt! Also ab zu den Kommentaren und frohes posten!

Ich mach gleich mal den Anfang mit dieser kleinen Babykatze und einem süßen Hund. Denn obwohl Katzen die <i>(Internet-?)</i>Welt regieren - Fotos und Beiträge zu anderen süßen Haustieren sind natürlich auch ok... 😼`,
    gallery: [dog, catSmall],
    subforum: 'Spaß und Sonstiges',
  },
  {
    title: 'Showcase April: Woran habt ihr im letzten Monat gearbeitet?',
    image: forum3,
    author: 'Matthias Wengel',
    username: 'matthiaswengel1',
    usergroup: 'Alumni',
    date: 1526531547211,
    read: false,
    content:
      'Lasst uns mal anfangen jeden Monat zu präsentieren an welchen Projekten wir gearbeitet haben! Ich fang das jetzt einfach mal mit dem Showcase April an...',
    id: 'aea633a9-012a-45d3-98ab-7207a3aba314',
    comments: [],
    gallery: [],
    subforum: 'Spaß und Sonstiges',
  },
]
