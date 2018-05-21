import image1 from "@/assets/images/event1.jpg";
import image2 from "@/assets/images/event2.png";
import image3 from "@/assets/images/event3.png";
import image4 from "@/assets/images/event4.png";

import forum1 from "@/assets/images/forum1.png";
import forum2 from "@/assets/images/forum2.png";
import forum3 from "@/assets/images/forum3.png";

export default {
  events: [
    {
      title: "8. Alumni Stammtisch",
      image: image1,
      location: "Schäbige Eckkneipe in Lehe",
      usergroup: "Alumni",
      date: 1526831747301,
      id: "05e53bc1-176c-4c6b-be3f-ab943172297b",
      attending: undefined
    },
    {
      title: "Show Your Work!",
      image: image4,
      location: "Haus T - HS Bremerhaven",
      usergroup: "Alumni",
      date: 1531931747301,
      id: "6d6e6e80-8f10-4fe5-9f8b-30ee8ec20354",
      attending: undefined
    },
    {
      title: "Bremerhaven läuft!",
      image: image3,
      location: "Bürgerpark Bremerhaven",
      usergroup: "Alle",
      date: 1526941544211,
      id: "72d1c641-6485-4b16-90fd-7494331be909",
      attending: true
    },
    {
      title: "Seminargruppe 4",
      image: image2,
      location: "Co-Working Space Alte Bürger",
      usergroup: "Studierende",
      date: 1526651549211,
      id: "11e15eab-d2e2-4cdd-94da-7111b1dce573",
      attending: undefined,
      username: "jonaskuske"
    },
    {
      title: "AstA Event vom Feinsten",
      image: image4,
      location: "AstA - HS Bremerhaven",
      usergroup: "Studierende",
      date: 1527841547211,
      id: "cc11a027-bb29-480e-b05e-dfc6cd5ad0e2",
      attending: false
    },
    {
      title: "Middenmang",
      image: image2,
      location: "Nachtschicht Bremerhaven",
      usergroup: "Alumni",
      date: 1533441547211,
      id: "d9dffddd-2adb-4eaf-b99f-61bb8d10c3a6",
      attending: undefined,
      username: "carloscholz"
    },
    {
      title: "Public Viewing - WM 2018",
      image: image1,
      location: "Wencke Docks (gutes Wetter)",
      usergroup: "Alle",
      date: 1529247600000,
      id: "0fb11543-4e87-4037-81fa-ee13d5c038c9",
      attending: true,
      username: "jonaskuske"
    }
  ],
  posts: [
    {
      title: "DMP-Day Plakatauswertung",
      image: forum1,
      author: "Andreas Teufel",
      username: "andreasteufel",
      usergroup: "Studierende",
      date: 1526651549211,
      read: false,
      id: "6ed11d9b-1c2a-4ad7-948a-b491467534e1",
      comments: [],
      content: "",
      gallery: []
    },
    {
      title: "#Caturday! Bilder von euren Haustieren hier her!",
      image: forum2,
      author: "Jonas Kuske",
      username: "jonaskuske",
      usergroup: "Alle",
      date: new Date(),
      read: true,
      id: "7eab7eb8-aee4-4229-a4ce-867f5e007781",
      comments: ["", "", "", "", "", "", "", "", ""],
      content: "",
      gallery: []
    },
    {
      title: "Showcase April: Woran habt ihr im letzten Monat gearbeitet?",
      image: forum3,
      author: "Matthias Wengel",
      username: "matthiaswengel1",
      usergroup: "Alumni",
      date: 1526531547211,
      read: false,
      content: "",
      id: "aea633a9-012a-45d3-98ab-7207a3aba314",
      comments: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      gallery: []
    }
  ]
};
