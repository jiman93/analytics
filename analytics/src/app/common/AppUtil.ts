import * as moment from 'moment';
import * as _ from 'underscore';
import { FormGroup } from '@angular/forms';
import { MatDialog } from "@angular/material";
import { ErrorDialogComponent } from "../components/common/error-dialog/error-dialog.component";
import { InfoDialogComponent } from '../components/common/info-dialog/info-dialog.component';

export class AppUtil {
    static idLookups = {};
    static names = ["Aayla Secura",
        "Acros-Krik",
        "Adi Gallia",
        "Admiral Conan Antonio Motti",
        "Admiral Gial Ackbar",
        "Admiral Ozzel",
        "Admiral Trench",
        "Agen Kolar",
        "Ahri Raas",
        "Ahsoka Tano",
        "Ak-Rev",
        "Almec",
        "Amee",
        "An Imperial starfighter ace.",
        "Anakin Skywalker",
        "Armitage Hux",
        "Arvel Crynyd",
        "Asajj Ventress",
        "Astri Oddo",
        "Aurra Sing",
        "AZI-3",
        "Bail Antilles",
        "Bail Prestor Organa",
        "Bana Breemu",
        "Baron Papanoida",
        "Barriss Offee",
        "BB-8",
        "Beed",
        "Ben Quadrinaros",
        "Bib Fortuna",
        "Biggs Darklighter",
        "Bo-Katan Kryze",
        "Boba Fett",
        "Boss Rugor Nass",
        "Bossk",
        "Bren Derlin",
        "C-3PO ",
        "C1-10P",
        "Cad Bane",
        "Captain Gregar Typho",
        "Captain Gregor",
        "Captain Jeremoch Colton",
        "Captain Lorth Needa",
        "Captain Panaka",
        "Captain Phasma",
        "Captain Rex",
        "Captain Roos Tarpals",
        "Cham Syndulla",
        "Chewbacca",
        "Chi Eekway Papanoida",
        "Cin Drallig",
        "Cliegg Lars",
        "Coleman Kcaj",
        "Coleman Trebor",
        "Commander Appo",
        "Commander Bly",
        "Commander Cody",
        "Commander Fil",
        "Commander Fox",
        "Commander Gree",
        "Commander Jet",
        "Commander Wolffe",
        "Cordé",
        "Count Dooku",
        "Dak Ralter",
        "Darred Janred Naberrie",
        "Darth Bane",
        "Darth Maul",
        "Darth Plagueis",
        "Daultay Dofine",
        "Dengar",
        "Depa Billaba",
        "Derek 'Hobbie' Klivian",
        "Dexter Jettster",
        "Doctor Cornelius Evazan ",
        "Dormé",
        "Dr. Nuvo Vindi",
        "Droidbait CT-00-2010",
        "Droopy McCool",
        "Ebe Endocott",
        "Echuu Shen-Jon",
        "Eighth Brother",
        "Eirtaé",
        "Ellé",
        "Embo",
        "EV-9D9",
        "Even Piell",
        "Ezra Bridger",
        "Faro Argyus",
        "Feral",
        "Fifth Brother",
        "Figrin D'an",
        "Finis Valorum",
        "Finn",
        "Firmus Piett",
        "Fives",
        "FN-2199 a.k.a. 'Nines'",
        "Fode",
        "FX-7",
        "Garazeb 'Zeb' Orrelios",
        "Garindan",
        "Garris Shrike",
        "Gavyn Sykes",
        "General Carlist Rieekan",
        "General Cassio Tagge",
        "General Crix Madine",
        "General Grievous",
        "General Maximilian Veers",
        "General Oro Dassyne",
        "Gizor Delso",
        "Gonk Droid",
        "Grand Admiral Thrawn",
        "Grand Inquisitor",
        "Grand Moff Wilhuff Tarkin",
        "Greeata Jendowanian",
        "Greedo",
        "Gungi",
        "Han Solo",
        "Hera Syndulla",
        "Hevy",
        "Hondo Ohnaka",
        "Huyang",
        "IG-88",
        "Ima-Gun Di",
        "Jan Dodonna",
        "Jango Fett",
        "Janus Greejatus",
        "Jar Jar Binks",
        "Jas Emari",
        "Jek Tono Porkins",
        "Jenna Zan Arbor",
        "Jerec",
        "Jessika 'Jess' Testor Pava",
        "Jobal Naberrie",
        "Jocasta Nu",
        "Joclad Danva",
        "Joh Yowza",
        "Jubnuk",
        "K-3PX",
        "Kanan Jarrus",
        "Kes Dameron",
        "Ki-Adi-Mundi",
        "King Katuunko",
        "Kit Fisto",
        "Kitster Banai",
        "Klaatu",
        "Korr Sella",
        "Krayn",
        "Kylo Ren",
        "L'ulo",
        "Lama Su",
        "Lando Calrissian",
        "Lieutenant Connix",
        "Lieutenant Thire",
        "Lieutenant Watts",
        "Lobot",
        "Logray",
        "Lok Durd",
        "Longo Two-Guns",
        "Lor San Tekka",
        "Lott Dod",
        "Luke Skywalker",
        "Luminara Unduli",
        "Lux Bonteri",
        "Lyn Me",
        "Maarek Stele",
        "Mace Windu",
        "Malakili",
        "Malé-Dee",
        "Mas Amedda",
        "Max Rebo",
        "Maz Kanata",
        "ME-8D9",
        "Meena Tills",
        "Mina Bonteri",
        "Moff Delian Mors",
        "Moff Tiaan Jerjerrod",
        "Momaw Nadon",
        "Mon Mothma",
        "Moradmin Bast",
        "Morallo Eval",
        "Morley",
        "Moteé",
        "Mother Talzin",
        "Naga Sadow",
        "Nahdar Vebb",
        "Nahdonnis Praji",
        "Nien Nunb",
        "Norra Wexley",
        "Nute Gunray",
        "Obi-Wan Kenobi",
        "Ody Mandrell",
        "Ona Nobis",
        "Onaconda Farr",
        "Oola",
        "Oppo Rancisis",
        "Orn Free Taa",
        "Orrin",
        "Osi Sobeck",
        "Owen Lars",
        "Pablo-Jill",
        "Padmé Amidala",
        "Palpatine",
        "Paploo",
        "Passel Argente",
        "Pharl McQuarrie",
        "Plo Koon",
        "Po Nudo",
        "Poe Dameron",
        "Ponda Baba",
        "Pong Krell",
        "Pooja Naberrie",
        "Princess Leia Organa",
        "PZ-4CO",
        "Queen Apailana",
        "Queen Breha Organa",
        "Queen Jamillia",
        "Queen Miraj Scintel",
        "Queen Neeyutnee",
        "Qui-Gon Jinn",
        "Quinlan Vos",
        "R2-D2",
        "R2-Q5",
        "R3-S6",
        "R4-G9",
        "R4-P17",
        "R4-P44",
        "R5-D4",
        "R5-J2",
        "Rabé",
        "Rae Sloane",
        "Rako Hardeen",
        "Rappertunie",
        "Raymus Antilles",
        "Ree-Yees",
        "Rey",
        "Ric Olié",
        "Riff Tamson",
        "Rinnrivin Di",
        "Rogue Squadron",
        "Rune Haako",
        "Rush Clovis",
        "Ruwee Naberrie",
        "Ryoo Naberrie",
        "Sabine Wren",
        "Sabé",
        "Saché",
        "Saesee Tiin",
        "Sage-Boneria",
        "Salacious B. Crumb",
        "San Hill",
        "Sarkli",
        "Satine Kryze",
        "Savage Opress",
        "Sebulba",
        "Seti Ashgad",
        "Sev'rance Tann",
        "Seventh Sister",
        "Shaak Ti",
        "Shara Bey",
        "Shedao Shai",
        "Shmi Skywalker",
        "Shu Mai",
        "Si Treemba",
        "Sifo-Dyas",
        "Sinjir Rath Velus",
        "Sio Bibble",
        "Sly Moore",
        "Sola Naberrie",
        "Sora Bulq",
        "Stass Allie",
        "Supreme Leader Snoke",
        "Sy Snootles",
        "Tarfful",
        "Taun We",
        "TC-14",
        "Tee Watt Kaa",
        "Teebo",
        "Teedo",
        "Temmin Wexley",
        "Tessek",
        "Tikkes",
        "Tion Medon",
        "U9-C4",
        "Unkar Plutt",
        "Vuffi Raa",
        "WAC-47",
        "Wag Too",
        "Wald",
        "Warlug",
        "Warok",
        "Wat Tambor",
        "Watto",
        "Wedge Antilles",
        "Wes Janson",
        "Wicket W. Warrick",
        "Wittin",
        "Wollivan",
        "Wuher",
        "Wullf Yularen",
        "Xamuel Lennox",
        "Yaddle",
        "Yané",
        "Yarael Poof",
        "Yarna D'al Gargan",
        "Yoda",
        "Zam Wesell",
        "Zev Senesca"
    ];

    static wcas= [
        {
            "ctrlId": "Kangaroo Island Region",
            "lookups": [
                {
                    "key": "5YKL-51-06-PNSE-01-01",
                    "value": "5YKL-51-06-PNSE-01-01"
                },
                {
                    "key": "5YKL-51-06-PNSE-01-02",
                    "value": "5YKL-51-06-PNSE-01-02"
                },
                {
                    "key": "5YKL-51-07-AMER-00-01",
                    "value": "5YKL-51-07-AMER-00-01"
                },
                {
                    "key": "5YKL-51-07-AMER-00-02",
                    "value": "5YKL-51-07-AMER-00-02"
                },
                {
                    "key": "5YKL-51-07-AMER-00-03",
                    "value": "5YKL-51-07-AMER-00-03"
                },
                {
                    "key": "5YKL-51-09-KING-00-01",
                    "value": "5YKL-51-09-KING-00-01"
                },
                {
                    "key": "5YKL-51-09-KING-00-02",
                    "value": "5YKL-51-09-KING-00-02"
                },
                {
                    "key": "5YKL-51-09-KING-00-03",
                    "value": "5YKL-51-09-KING-00-03"
                },
                {
                    "key": "5YKL-51-09-KING-00-04",
                    "value": "5YKL-51-09-KING-00-04"
                },
                {
                    "key": "5YKL-51-09-KING-00-05",
                    "value": "5YKL-51-09-KING-00-05"
                },
                {
                    "key": "5YKL-51-10-EMUB-00-01",
                    "value": "5YKL-51-10-EMUB-00-01"
                },
                {
                    "key": "5YKL-51-10-EMUB-00-02",
                    "value": "5YKL-51-10-EMUB-00-02"
                },
                {
                    "key": "5YKL-51-11-NEPE-00-01",
                    "value": "5YKL-51-11-NEPE-00-01"
                },
                {
                    "key": "5YKL-51-11-NEPE-00-02",
                    "value": "5YKL-51-11-NEPE-00-02"
                },
                {
                    "key": "5YKL-51-11-NEPE-00-03",
                    "value": "5YKL-51-11-NEPE-00-03"
                },
                {
                    "key": "5YKL-51-12-KICE-01-01",
                    "value": "5YKL-51-12-KICE-01-01"
                },
                {
                    "key": "5YKL-51-12-KICE-01-02",
                    "value": "5YKL-51-12-KICE-01-02"
                },
                {
                    "key": "5YKL-51-12-KICE-01-03",
                    "value": "5YKL-51-12-KICE-01-03"
                },
                {
                    "key": "5YKL-51-12-KICE-01-04",
                    "value": "5YKL-51-12-KICE-01-04"
                },
                {
                    "key": "5YKL-51-12-KICE-01-05",
                    "value": "5YKL-51-12-KICE-01-05"
                }
            ]
        }
    ];
    static wsas = [
        {
            "ctrlId": "Albany Region",
            "lookups": [
                {
                    "key": "6MBA",
                    "value": "6MBA"
                },
                {
                    "key": "6DNK",
                    "value": "6DNK"
                },
                {
                    "key": "6ALN",
                    "value": "6ALN"
                }
            ]
        },
        {
            "ctrlId": "Albury Region",
            "lookups": [
                {
                    "key": "3WDG",
                    "value": "3WDG"
                },
                {
                    "key": "3TLT",
                    "value": "3TLT"
                },
                {
                    "key": "2LAV",
                    "value": "2LAV"
                },
                {
                    "key": "2ALB",
                    "value": "2ALB"
                }
            ]
        },
        {
            "ctrlId": "Ararat Region",
            "lookups": [
                {
                    "key": "3STE",
                    "value": "3STE"
                },
                {
                    "key": "3ARA",
                    "value": "3ARA"
                }
            ]
        },
        {
            "ctrlId": "Armidale Region",
            "lookups": [
                {
                    "key": "2ARM",
                    "value": "2ARM"
                },
                {
                    "key": "2URL",
                    "value": "2URL"
                },
                {
                    "key": "2GYR",
                    "value": "2GYR"
                },
                {
                    "key": "2WLH",
                    "value": "2WLH"
                }
            ]
        },
        {
            "ctrlId": "Ashmore CSA",
            "lookups": [
                {
                    "key": "4LOG",
                    "value": "4LOG"
                },
                {
                    "key": "4MLS",
                    "value": "4MLS"
                },
                {
                    "key": "4WWL",
                    "value": "4WWL"
                }
            ]
        },
        {
            "ctrlId": "Aspley Depot CSA",
            "lookups": [
                {
                    "key": "4MCH",
                    "value": "4MCH"
                }
            ]
        },
        {
            "ctrlId": "Atherton Region",
            "lookups": [
                {
                    "key": "4RHO",
                    "value": "4RHO"
                },
                {
                    "key": "4HRB",
                    "value": "4HRB"
                },
                {
                    "key": "4ATH",
                    "value": "4ATH"
                },
                {
                    "key": "4MDA",
                    "value": "4MDA"
                }
            ]
        },
        {
            "ctrlId": "Ayr Region",
            "lookups": [
                {
                    "key": "4CTR",
                    "value": "4CTR"
                },
                {
                    "key": "4AYR",
                    "value": "4AYR"
                }
            ]
        },
        {
            "ctrlId": "Bacchus Marsh Region",
            "lookups": [
                {
                    "key": "3BAC",
                    "value": "3BAC"
                },
                {
                    "key": "3DYL",
                    "value": "3DYL"
                },
                {
                    "key": "3MLT",
                    "value": "3MLT"
                },
                {
                    "key": "3BLL",
                    "value": "3BLL"
                }
            ]
        },
        {
            "ctrlId": "Bairnsdale Region",
            "lookups": [
                {
                    "key": "3ORB",
                    "value": "3ORB"
                },
                {
                    "key": "3BAI",
                    "value": "3BAI"
                },
                {
                    "key": "3PAY",
                    "value": "3PAY"
                },
                {
                    "key": "3LKE",
                    "value": "3LKE"
                }
            ]
        },
        {
            "ctrlId": "Balaklava Region",
            "lookups": [
                {
                    "key": "5BKV",
                    "value": "5BKV"
                }
            ]
        },
        {
            "ctrlId": "Ballarat Region",
            "lookups": [
                {
                    "key": "3BRA",
                    "value": "3BRA"
                },
                {
                    "key": "3AVO",
                    "value": "3AVO"
                },
                {
                    "key": "3BFO",
                    "value": "3BFO"
                },
                {
                    "key": "3CLU",
                    "value": "3CLU"
                },
                {
                    "key": "3CRW",
                    "value": "3CRW"
                },
                {
                    "key": "3MAB",
                    "value": "3MAB"
                },
                {
                    "key": "3SEB",
                    "value": "3SEB"
                },
                {
                    "key": "3WEN",
                    "value": "3WEN"
                }
            ]
        },
        {
            "ctrlId": "Barcaldine Region",
            "lookups": [
                {
                    "key": "4BLC",
                    "value": "4BLC"
                },
                {
                    "key": "4BAR",
                    "value": "4BAR"
                }
            ]
        },
        {
            "ctrlId": "Batemans Bay Region",
            "lookups": [
                {
                    "key": "2MYA",
                    "value": "2MYA"
                },
                {
                    "key": "2BTM",
                    "value": "2BTM"
                },
                {
                    "key": "2BMG",
                    "value": "2BMG"
                },
                {
                    "key": "2TUH",
                    "value": "2TUH"
                },
                {
                    "key": "2NRM",
                    "value": "2NRM"
                },
                {
                    "key": "2MSP",
                    "value": "2MSP"
                }
            ]
        },
        {
            "ctrlId": "Bendalong Region",
            "lookups": [
                {
                    "key": "2ULL",
                    "value": "2ULL"
                },
                {
                    "key": "2SUX",
                    "value": "2SUX"
                },
                {
                    "key": "2SAN",
                    "value": "2SAN"
                },
                {
                    "key": "2BWL",
                    "value": "2BWL"
                },
                {
                    "key": "2BND",
                    "value": "2BND"
                }
            ]
        },
        {
            "ctrlId": "Bendigo Region",
            "lookups": [
                {
                    "key": "3BEN",
                    "value": "3BEN"
                },
                {
                    "key": "3CAS",
                    "value": "3CAS"
                },
                {
                    "key": "3DUY",
                    "value": "3DUY"
                },
                {
                    "key": "3EAH",
                    "value": "3EAH"
                },
                {
                    "key": "3EPS",
                    "value": "3EPS"
                },
                {
                    "key": "3MLD",
                    "value": "3MLD"
                }
            ]
        },
        {
            "ctrlId": "Bentley Depot CSA",
            "lookups": [
                {
                    "key": "6BKH",
                    "value": "6BKH"
                },
                {
                    "key": "6ELB",
                    "value": "6ELB"
                },
                {
                    "key": "6MDN",
                    "value": "6MDN"
                },
                {
                    "key": "6MRA",
                    "value": "6MRA"
                },
                {
                    "key": "6NTM",
                    "value": "6NTM"
                },
                {
                    "key": "6TOO",
                    "value": "6TOO"
                },
                {
                    "key": "6WNG",
                    "value": "6WNG"
                }
            ]
        },
        {
            "ctrlId": "Berkeley Vale CSA",
            "lookups": [
                {
                    "key": "2WYO",
                    "value": "2WYO"
                }
            ]
        },
        {
            "ctrlId": "Berri Region",
            "lookups": [
                {
                    "key": "5RNK",
                    "value": "5RNK"
                },
                {
                    "key": "5BRR",
                    "value": "5BRR"
                },
                {
                    "key": "5LXT",
                    "value": "5LXT"
                },
                {
                    "key": "5BAA",
                    "value": "5BAA"
                }
            ]
        },
        {
            "ctrlId": "Beverley Region",
            "lookups": [
                {
                    "key": "6YOR",
                    "value": "6YOR"
                },
                {
                    "key": "6BVL",
                    "value": "6BVL"
                },
                {
                    "key": "6CND",
                    "value": "6CND"
                }
            ]
        },
        {
            "ctrlId": "Bordertown Region",
            "lookups": [
                {
                    "key": "5BDT",
                    "value": "5BDT"
                },
                {
                    "key": "5KET",
                    "value": "5KET"
                }
            ]
        },
        {
            "ctrlId": "Bourke Region",
            "lookups": [
                {
                    "key": "2BRK",
                    "value": "2BRK"
                }
            ]
        },
        {
            "ctrlId": "Bowen Region",
            "lookups": [
                {
                    "key": "4PPN",
                    "value": "4PPN"
                },
                {
                    "key": "4CNV",
                    "value": "4CNV"
                },
                {
                    "key": "4BWE",
                    "value": "4BWE"
                },
                {
                    "key": "4AIR",
                    "value": "4AIR"
                }
            ]
        },
        {
            "ctrlId": "Bridgetown Region",
            "lookups": [
                {
                    "key": "6PMB",
                    "value": "6PMB"
                },
                {
                    "key": "6NNU",
                    "value": "6NNU"
                },
                {
                    "key": "6MJM",
                    "value": "6MJM"
                },
                {
                    "key": "6BGT",
                    "value": "6BGT"
                }
            ]
        },
        {
            "ctrlId": "Bright Region",
            "lookups": [
                {
                    "key": "3MBE",
                    "value": "3MBE"
                },
                {
                    "key": "3BGH",
                    "value": "3BGH"
                }
            ]
        },
        {
            "ctrlId": "Broadford Region",
            "lookups": [
                {
                    "key": "3BRF",
                    "value": "3BRF"
                },
                {
                    "key": "3SEY",
                    "value": "3SEY"
                },
                {
                    "key": "3HEA",
                    "value": "3HEA"
                },
                {
                    "key": "3KIL",
                    "value": "3KIL"
                },
                {
                    "key": "3WLN",
                    "value": "3WLN"
                }
            ]
        },
        {
            "ctrlId": "Broken Hill Region",
            "lookups": [
                {
                    "key": "2BNH",
                    "value": "2BNH"
                }
            ]
        },
        {
            "ctrlId": "Broome Region",
            "lookups": [
                {
                    "key": "6BRM",
                    "value": "6BRM"
                }
            ]
        },
        {
            "ctrlId": "Bunbury Region",
            "lookups": [
                {
                    "key": "6HRV",
                    "value": "6HRV"
                },
                {
                    "key": "6BRJ",
                    "value": "6BRJ"
                },
                {
                    "key": "6BNB",
                    "value": "6BNB"
                },
                {
                    "key": "6MLU",
                    "value": "6MLU"
                },
                {
                    "key": "6AUS",
                    "value": "6AUS"
                }
            ]
        },
        {
            "ctrlId": "Bundaberg Region",
            "lookups": [
                {
                    "key": "4NGO",
                    "value": "4NGO"
                },
                {
                    "key": "4BBE",
                    "value": "4BBE"
                },
                {
                    "key": "4WON",
                    "value": "4WON"
                },
                {
                    "key": "4AVO",
                    "value": "4AVO"
                }
            ]
        },
        {
            "ctrlId": "Burra Region",
            "lookups": [
                {
                    "key": "5CLR",
                    "value": "5CLR"
                },
                {
                    "key": "5BUR",
                    "value": "5BUR"
                }
            ]
        },
        {
            "ctrlId": "Busselton Region",
            "lookups": [
                {
                    "key": "6MRG",
                    "value": "6MRG"
                },
                {
                    "key": "6DBG",
                    "value": "6DBG"
                },
                {
                    "key": "6COW",
                    "value": "6COW"
                },
                {
                    "key": "6BUS",
                    "value": "6BUS"
                },
                {
                    "key": "6AUU",
                    "value": "6AUU"
                }
            ]
        },
        {
            "ctrlId": "Cairns Region",
            "lookups": [
                {
                    "key": "4SHF",
                    "value": "4SHF"
                },
                {
                    "key": "4KRA",
                    "value": "4KRA"
                },
                {
                    "key": "4GNV",
                    "value": "4GNV"
                },
                {
                    "key": "4FRE",
                    "value": "4FRE"
                },
                {
                    "key": "4EDM",
                    "value": "4EDM"
                },
                {
                    "key": "4EDG",
                    "value": "4EDG"
                },
                {
                    "key": "4CAI",
                    "value": "4CAI"
                }
            ]
        },
        {
            "ctrlId": "Campbell Town Region",
            "lookups": [
                {
                    "key": "7CLT",
                    "value": "7CLT"
                }
            ]
        },
        {
            "ctrlId": "Campbelltown",
            "lookups": [
                {
                    "key": "2MRL",
                    "value": "2MRL"
                }
            ]
        },
        {
            "ctrlId": "Campbelltown CSA",
            "lookups": [
                {
                    "key": "2MTT",
                    "value": "2MTT"
                },
                {
                    "key": "2NRL",
                    "value": "2NRL"
                },
                {
                    "key": "2TAH",
                    "value": "2TAH"
                }
            ]
        },
        {
            "ctrlId": "Cannington CSA",
            "lookups": [
                {
                    "key": "6KAL",
                    "value": "6KAL"
                }
            ]
        },
        {
            "ctrlId": "Capel Region",
            "lookups": [
                {
                    "key": "6DNY",
                    "value": "6DNY"
                },
                {
                    "key": "6COI",
                    "value": "6COI"
                },
                {
                    "key": "6CPL",
                    "value": "6CPL"
                }
            ]
        },
        {
            "ctrlId": "Carnarvon Region",
            "lookups": [
                {
                    "key": "6CVN",
                    "value": "6CVN"
                }
            ]
        },
        {
            "ctrlId": "Castle Hill CSA",
            "lookups": [
                {
                    "key": "2DUR",
                    "value": "2DUR"
                },
                {
                    "key": "2ROU",
                    "value": "2ROU"
                }
            ]
        },
        {
            "ctrlId": "Ceduna Region",
            "lookups": [
                {
                    "key": "5CDN",
                    "value": "5CDN"
                }
            ]
        },
        {
            "ctrlId": "Chinchilla Region",
            "lookups": [
                {
                    "key": "4MLE",
                    "value": "4MLE"
                },
                {
                    "key": "4CHI",
                    "value": "4CHI"
                }
            ]
        },
        {
            "ctrlId": "Claremont Region",
            "lookups": [
                {
                    "key": "7NOL",
                    "value": "7NOL"
                },
                {
                    "key": "7PON",
                    "value": "7PON"
                },
                {
                    "key": "7NWT",
                    "value": "7NWT"
                }
            ]
        },
        {
            "ctrlId": "Cobar Region",
            "lookups": [
                {
                    "key": "2NYG",
                    "value": "2NYG"
                },
                {
                    "key": "2CBA",
                    "value": "2CBA"
                }
            ]
        },
        {
            "ctrlId": "Cobden Region",
            "lookups": [
                {
                    "key": "3TIM",
                    "value": "3TIM"
                },
                {
                    "key": "3TER",
                    "value": "3TER"
                },
                {
                    "key": "3COB",
                    "value": "3COB"
                },
                {
                    "key": "3CMP",
                    "value": "3CMP"
                }
            ]
        },
        {
            "ctrlId": "Cobram Region",
            "lookups": [
                {
                    "key": "2TWA",
                    "value": "2TWA"
                },
                {
                    "key": "2FNL",
                    "value": "2FNL"
                },
                {
                    "key": "2DNQ",
                    "value": "2DNQ"
                },
                {
                    "key": "3CBM",
                    "value": "3CBM"
                }
            ]
        },
        {
            "ctrlId": "Coffs Harbour Region",
            "lookups": [
                {
                    "key": "2WGL",
                    "value": "2WGL"
                },
                {
                    "key": "2SWR",
                    "value": "2SWR"
                },
                {
                    "key": "2MAC",
                    "value": "2MAC"
                },
                {
                    "key": "2DRG",
                    "value": "2DRG"
                },
                {
                    "key": "2CFS",
                    "value": "2CFS"
                },
                {
                    "key": "2BLG",
                    "value": "2BLG"
                },
                {
                    "key": "2URG",
                    "value": "2URG"
                },
                {
                    "key": "2SAW",
                    "value": "2SAW"
                }
            ]
        },
        {
            "ctrlId": "Colac Region",
            "lookups": [
                {
                    "key": "3ABA",
                    "value": "3ABA"
                },
                {
                    "key": "3COL",
                    "value": "3COL"
                }
            ]
        },
        {
            "ctrlId": "Coober Pedy Region",
            "lookups": [
                {
                    "key": "5CRP",
                    "value": "5CRP"
                }
            ]
        },
        {
            "ctrlId": "Cooktown Region",
            "lookups": [
                {
                    "key": "4CKT",
                    "value": "4CKT"
                }
            ]
        },
        {
            "ctrlId": "Coolgardie Region",
            "lookups": [
                {
                    "key": "6KGL",
                    "value": "6KGL"
                },
                {
                    "key": "6KAM",
                    "value": "6KAM"
                },
                {
                    "key": "6CGD",
                    "value": "6CGD"
                }
            ]
        },
        {
            "ctrlId": "Coonamble Region",
            "lookups": [
                {
                    "key": "2CMB",
                    "value": "2CMB"
                }
            ]
        },
        {
            "ctrlId": "Corowa Region",
            "lookups": [
                {
                    "key": "3YWG",
                    "value": "3YWG"
                },
                {
                    "key": "3CHT",
                    "value": "3CHT"
                },
                {
                    "key": "2HOW",
                    "value": "2HOW"
                },
                {
                    "key": "2COW",
                    "value": "2COW"
                }
            ]
        },
        {
            "ctrlId": "Corryong Region",
            "lookups": [
                {
                    "key": "3CRY",
                    "value": "3CRY"
                }
            ]
        },
        {
            "ctrlId": "Cowell Region",
            "lookups": [
                {
                    "key": "5CLV",
                    "value": "5CLV"
                },
                {
                    "key": "5COW",
                    "value": "5COW"
                }
            ]
        },
        {
            "ctrlId": "Cowra Region",
            "lookups": [
                {
                    "key": "2PKS",
                    "value": "2PKS"
                },
                {
                    "key": "2CWR",
                    "value": "2CWR"
                },
                {
                    "key": "2CAN",
                    "value": "2CAN"
                }
            ]
        },
        {
            "ctrlId": "Cranbourne CSA",
            "lookups": [
                {
                    "key": "3BWK",
                    "value": "3BWK"
                },
                {
                    "key": "3CBN",
                    "value": "3CBN"
                },
                {
                    "key": "3GAR",
                    "value": "3GAR"
                },
                {
                    "key": "3LGL",
                    "value": "3LGL"
                },
                {
                    "key": "3MOE",
                    "value": "3MOE"
                },
                {
                    "key": "3WGU",
                    "value": "3WGU"
                }
            ]
        },
        {
            "ctrlId": "Crows Nest Region",
            "lookups": [
                {
                    "key": "4TOG",
                    "value": "4TOG"
                },
                {
                    "key": "4ESK",
                    "value": "4ESK"
                },
                {
                    "key": "4CNS",
                    "value": "4CNS"
                }
            ]
        },
        {
            "ctrlId": "Crystal Brook Region",
            "lookups": [
                {
                    "key": "5PBR",
                    "value": "5PBR"
                },
                {
                    "key": "5CLB",
                    "value": "5CLB"
                }
            ]
        },
        {
            "ctrlId": "Dalby Region",
            "lookups": [
                {
                    "key": "4DAB",
                    "value": "4DAB"
                }
            ]
        },
        {
            "ctrlId": "Darwin CSA",
            "lookups": [
                {
                    "key": "8DRW",
                    "value": "8DRW"
                }
            ]
        },
        {
            "ctrlId": "Denham Region",
            "lookups": [
                {
                    "key": "6DNH",
                    "value": "6DNH"
                }
            ]
        },
        {
            "ctrlId": "Derby Region",
            "lookups": [
                {
                    "key": "6DRB",
                    "value": "6DRB"
                }
            ]
        },
        {
            "ctrlId": "Diamond Beach Region",
            "lookups": [
                {
                    "key": "2NAB",
                    "value": "2NAB"
                },
                {
                    "key": "2GLO",
                    "value": "2GLO"
                }
            ]
        },
        {
            "ctrlId": "Donald Region",
            "lookups": [
                {
                    "key": "3STA",
                    "value": "3STA"
                },
                {
                    "key": "3SOP",
                    "value": "3SOP"
                },
                {
                    "key": "3DON",
                    "value": "3DON"
                },
                {
                    "key": "3CHA",
                    "value": "3CHA"
                }
            ]
        },
        {
            "ctrlId": "Dubbo",
            "lookups": [
                {
                    "key": "2GRI",
                    "value": "2GRI"
                }
            ]
        },
        {
            "ctrlId": "Dubbo Region",
            "lookups": [
                {
                    "key": "2WEL",
                    "value": "2WEL"
                },
                {
                    "key": "2DBB",
                    "value": "2DBB"
                },
                {
                    "key": "2PKH",
                    "value": "2PKH"
                }
            ]
        },
        {
            "ctrlId": "Dungog Region",
            "lookups": [
                {
                    "key": "2DGO",
                    "value": "2DGO"
                },
                {
                    "key": "2BUL",
                    "value": "2BUL"
                },
                {
                    "key": "2TGN",
                    "value": "2TGN"
                },
                {
                    "key": "2HAW",
                    "value": "2HAW"
                }
            ]
        },
        {
            "ctrlId": "Eastern Creek Depot",
            "lookups": [
                {
                    "key": "2BRG",
                    "value": "2BRG"
                },
                {
                    "key": "2MGO",
                    "value": "2MGO"
                }
            ]
        },
        {
            "ctrlId": "Eden Region",
            "lookups": [
                {
                    "key": "2MER",
                    "value": "2MER"
                },
                {
                    "key": "2BEG",
                    "value": "2BEG"
                },
                {
                    "key": "2EDN",
                    "value": "2EDN"
                }
            ]
        },
        {
            "ctrlId": "Elizabeth Region",
            "lookups": [
                {
                    "key": "5TWO",
                    "value": "5TWO"
                },
                {
                    "key": "5SMF",
                    "value": "5SMF"
                },
                {
                    "key": "5SAL",
                    "value": "5SAL"
                },
                {
                    "key": "5GAW",
                    "value": "5GAW"
                },
                {
                    "key": "5EZB",
                    "value": "5EZB"
                }
            ]
        },
        {
            "ctrlId": "Elmore Region",
            "lookups": [
                {
                    "key": "3RCS",
                    "value": "3RCS"
                },
                {
                    "key": "3ELM",
                    "value": "3ELM"
                }
            ]
        },
        {
            "ctrlId": "Emerald Region",
            "lookups": [
                {
                    "key": "4EME",
                    "value": "4EME"
                },
                {
                    "key": "4BKW",
                    "value": "4BKW"
                }
            ]
        },
        {
            "ctrlId": "Esperance Region",
            "lookups": [
                {
                    "key": "6ESP",
                    "value": "6ESP"
                }
            ]
        },
        {
            "ctrlId": "Exmouth Region",
            "lookups": [
                {
                    "key": "6EXM",
                    "value": "6EXM"
                }
            ]
        },
        {
            "ctrlId": "Forbes Region",
            "lookups": [
                {
                    "key": "2FRB",
                    "value": "2FRB"
                },
                {
                    "key": "2GFE",
                    "value": "2GFE"
                }
            ]
        },
        {
            "ctrlId": "Foster Region",
            "lookups": [
                {
                    "key": "3YRA",
                    "value": "3YRA"
                },
                {
                    "key": "3FOS",
                    "value": "3FOS"
                },
                {
                    "key": "3SPT",
                    "value": "3SPT"
                }
            ]
        },
        {
            "ctrlId": "Freeling Region",
            "lookups": [
                {
                    "key": "5NUR",
                    "value": "5NUR"
                },
                {
                    "key": "5LYD",
                    "value": "5LYD"
                },
                {
                    "key": "5FRL",
                    "value": "5FRL"
                }
            ]
        },
        {
            "ctrlId": "Geelong Region",
            "lookups": [
                {
                    "key": "3LAR",
                    "value": "3LAR"
                },
                {
                    "key": "3MOO",
                    "value": "3MOO"
                },
                {
                    "key": "3BBR",
                    "value": "3BBR"
                },
                {
                    "key": "3BMT",
                    "value": "3BMT"
                },
                {
                    "key": "3GEE",
                    "value": "3GEE"
                },
                {
                    "key": "3OCG",
                    "value": "3OCG"
                },
                {
                    "key": "3PTO",
                    "value": "3PTO"
                },
                {
                    "key": "3TOR",
                    "value": "3TOR"
                }
            ]
        },
        {
            "ctrlId": "Geeveston Region",
            "lookups": [
                {
                    "key": "7MGT",
                    "value": "7MGT"
                },
                {
                    "key": "7HUL",
                    "value": "7HUL"
                },
                {
                    "key": "7CYE",
                    "value": "7CYE"
                },
                {
                    "key": "7GEV",
                    "value": "7GEV"
                }
            ]
        },
        {
            "ctrlId": "Geraldton Region",
            "lookups": [
                {
                    "key": "6GLT",
                    "value": "6GLT"
                },
                {
                    "key": "6NTH",
                    "value": "6NTH"
                },
                {
                    "key": "6KLB",
                    "value": "6KLB"
                }
            ]
        },
        {
            "ctrlId": "Gilgandra Region",
            "lookups": [
                {
                    "key": "2GIL",
                    "value": "2GIL"
                },
                {
                    "key": "2CNA",
                    "value": "2CNA"
                }
            ]
        },
        {
            "ctrlId": "Gladstone Region",
            "lookups": [
                {
                    "key": "4GLS",
                    "value": "4GLS"
                },
                {
                    "key": "4CLP",
                    "value": "4CLP"
                },
                {
                    "key": "4AGW",
                    "value": "4AGW"
                },
                {
                    "key": "4BOY",
                    "value": "4BOY"
                }
            ]
        },
        {
            "ctrlId": "Goodna CSA",
            "lookups": [
                {
                    "key": "4BDS",
                    "value": "4BDS"
                },
                {
                    "key": "4BOO",
                    "value": "4BOO"
                },
                {
                    "key": "4JBB",
                    "value": "4JBB"
                },
                {
                    "key": "4KOO",
                    "value": "4KOO"
                }
            ]
        },
        {
            "ctrlId": "Goomeri Region",
            "lookups": [
                {
                    "key": "4MUR",
                    "value": "4MUR"
                },
                {
                    "key": "4WDA",
                    "value": "4WDA"
                },
                {
                    "key": "4GMR",
                    "value": "4GMR"
                }
            ]
        },
        {
            "ctrlId": "Grafton Region",
            "lookups": [
                {
                    "key": "2MCL",
                    "value": "2MCL"
                },
                {
                    "key": "2GRN",
                    "value": "2GRN"
                },
                {
                    "key": "2YMB",
                    "value": "2YMB"
                }
            ]
        },
        {
            "ctrlId": "Griffith Region",
            "lookups": [
                {
                    "key": "2LTO",
                    "value": "2LTO"
                },
                {
                    "key": "2GFT",
                    "value": "2GFT"
                },
                {
                    "key": "2DNP",
                    "value": "2DNP"
                }
            ]
        },
        {
            "ctrlId": "Gympie Region",
            "lookups": [
                {
                    "key": "4GYM",
                    "value": "4GYM"
                },
                {
                    "key": "4BBG",
                    "value": "4BBG"
                },
                {
                    "key": "4TBA",
                    "value": "4TBA"
                },
                {
                    "key": "4RAB",
                    "value": "4RAB"
                }
            ]
        },
        {
            "ctrlId": "Hamilton",
            "lookups": [
                {
                    "key": "2NDS",
                    "value": "2NDS"
                }
            ]
        },
        {
            "ctrlId": "Hamilton Region",
            "lookups": [
                {
                    "key": "3HMO",
                    "value": "3HMO"
                },
                {
                    "key": "3EDE",
                    "value": "3EDE"
                },
                {
                    "key": "3CST",
                    "value": "3CST"
                },
                {
                    "key": "3CLN",
                    "value": "3CLN"
                }
            ]
        },
        {
            "ctrlId": "Hay Region",
            "lookups": [
                {
                    "key": "2HAY",
                    "value": "2HAY"
                }
            ]
        },
        {
            "ctrlId": "Hillston Region",
            "lookups": [
                {
                    "key": "2LCG",
                    "value": "2LCG"
                },
                {
                    "key": "2HTO",
                    "value": "2HTO"
                }
            ]
        },
        {
            "ctrlId": "Hobart Region",
            "lookups": [
                {
                    "key": "7TAR",
                    "value": "7TAR"
                },
                {
                    "key": "7SHR",
                    "value": "7SHR"
                },
                {
                    "key": "7KIN",
                    "value": "7KIN"
                },
                {
                    "key": "7HOB",
                    "value": "7HOB"
                },
                {
                    "key": "7CRE",
                    "value": "7CRE"
                },
                {
                    "key": "7BEV",
                    "value": "7BEV"
                }
            ]
        },
        {
            "ctrlId": "Hopetoun Region",
            "lookups": [
                {
                    "key": "6HOP",
                    "value": "6HOP"
                }
            ]
        },
        {
            "ctrlId": "Horsham Region",
            "lookups": [
                {
                    "key": "3HRS",
                    "value": "3HRS"
                },
                {
                    "key": "3DBL",
                    "value": "3DBL"
                },
                {
                    "key": "3NHI",
                    "value": "3NHI"
                }
            ]
        },
        {
            "ctrlId": "Hughenden Region",
            "lookups": [
                {
                    "key": "4HUG",
                    "value": "4HUG"
                }
            ]
        },
        {
            "ctrlId": "Inglewood Region",
            "lookups": [
                {
                    "key": "4GOO",
                    "value": "4GOO"
                },
                {
                    "key": "4ING",
                    "value": "4ING"
                }
            ]
        },
        {
            "ctrlId": "Innisfail Region",
            "lookups": [
                {
                    "key": "4TUL",
                    "value": "4TUL"
                },
                {
                    "key": "4INN",
                    "value": "4INN"
                },
                {
                    "key": "4BDA",
                    "value": "4BDA"
                },
                {
                    "key": "4MIB",
                    "value": "4MIB"
                },
                {
                    "key": "4CDW",
                    "value": "4CDW"
                }
            ]
        },
        {
            "ctrlId": "Inverell Region",
            "lookups": [
                {
                    "key": "2IVL",
                    "value": "2IVL"
                }
            ]
        },
        {
            "ctrlId": "Inverloch Region",
            "lookups": [
                {
                    "key": "3LEO",
                    "value": "3LEO"
                },
                {
                    "key": "3IVC",
                    "value": "3IVC"
                },
                {
                    "key": "3WON",
                    "value": "3WON"
                },
                {
                    "key": "3VEN",
                    "value": "3VEN"
                },
                {
                    "key": "3NWH",
                    "value": "3NWH"
                },
                {
                    "key": "3CRI",
                    "value": "3CRI"
                },
                {
                    "key": "3COW",
                    "value": "3COW"
                }
            ]
        },
        {
            "ctrlId": "Ipswich CSA",
            "lookups": [
                {
                    "key": "4BRA",
                    "value": "4BRA"
                },
                {
                    "key": "4FVL",
                    "value": "4FVL"
                },
                {
                    "key": "4GTW",
                    "value": "4GTW"
                },
                {
                    "key": "4HEL",
                    "value": "4HEL"
                },
                {
                    "key": "4MRB",
                    "value": "4MRB"
                },
                {
                    "key": "4RSW",
                    "value": "4RSW"
                }
            ]
        },
        {
            "ctrlId": "Kangaroo Island Region",
            "lookups": [
                {
                    "key": "5YKL",
                    "value": "5YKL"
                }
            ]
        },
        {
            "ctrlId": "Kapunda Region",
            "lookups": [
                {
                    "key": "5RVT",
                    "value": "5RVT"
                },
                {
                    "key": "5KAP",
                    "value": "5KAP"
                }
            ]
        },
        {
            "ctrlId": "Karingal CSA",
            "lookups": [
                {
                    "key": "3SOM",
                    "value": "3SOM"
                }
            ]
        },
        {
            "ctrlId": "Karratha Region",
            "lookups": [
                {
                    "key": "6WIK",
                    "value": "6WIK"
                },
                {
                    "key": "6RBR",
                    "value": "6RBR"
                },
                {
                    "key": "6KAH",
                    "value": "6KAH"
                },
                {
                    "key": "6DMP",
                    "value": "6DMP"
                }
            ]
        },
        {
            "ctrlId": "Katanning Region",
            "lookups": [
                {
                    "key": "6KOJ",
                    "value": "6KOJ"
                },
                {
                    "key": "6KAT",
                    "value": "6KAT"
                },
                {
                    "key": "6GNO",
                    "value": "6GNO"
                }
            ]
        },
        {
            "ctrlId": "Kellerberrin Region",
            "lookups": [
                {
                    "key": "6KBR",
                    "value": "6KBR"
                }
            ]
        },
        {
            "ctrlId": "Kelmscott CSA",
            "lookups": [
                {
                    "key": "6ARM",
                    "value": "6ARM"
                },
                {
                    "key": "6MDJ",
                    "value": "6MDJ"
                }
            ]
        },
        {
            "ctrlId": "Kerang Region",
            "lookups": [
                {
                    "key": "3LBG",
                    "value": "3LBG"
                },
                {
                    "key": "3KER",
                    "value": "3KER"
                },
                {
                    "key": "3COH",
                    "value": "3COH"
                },
                {
                    "key": "3SWI",
                    "value": "3SWI"
                },
                {
                    "key": "2BHA",
                    "value": "2BHA"
                }
            ]
        },
        {
            "ctrlId": "Kimba Region",
            "lookups": [
                {
                    "key": "5KIB",
                    "value": "5KIB"
                }
            ]
        },
        {
            "ctrlId": "Kingaroy Region",
            "lookups": [
                {
                    "key": "4NAN",
                    "value": "4NAN"
                },
                {
                    "key": "4KRO",
                    "value": "4KRO"
                },
                {
                    "key": "4BLB",
                    "value": "4BLB"
                },
                {
                    "key": "4YMA",
                    "value": "4YMA"
                }
            ]
        },
        {
            "ctrlId": "Kingscliffe Region",
            "lookups": [
                {
                    "key": "2TER",
                    "value": "2TER"
                },
                {
                    "key": "2MWB",
                    "value": "2MWB"
                },
                {
                    "key": "2KCL",
                    "value": "2KCL"
                },
                {
                    "key": "2TWH",
                    "value": "2TWH"
                },
                {
                    "key": "2HAP",
                    "value": "2HAP"
                }
            ]
        },
        {
            "ctrlId": "Kununurra Region",
            "lookups": [
                {
                    "key": "6KNR",
                    "value": "6KNR"
                }
            ]
        },
        {
            "ctrlId": "Launceston CSA",
            "lookups": [
                {
                    "key": "7STM",
                    "value": "7STM"
                }
            ]
        },
        {
            "ctrlId": "Launceston Region",
            "lookups": [
                {
                    "key": "7RAO",
                    "value": "7RAO"
                },
                {
                    "key": "7PTS",
                    "value": "7PTS"
                },
                {
                    "key": "7LEG",
                    "value": "7LEG"
                },
                {
                    "key": "7LAU",
                    "value": "7LAU"
                },
                {
                    "key": "7GEW",
                    "value": "7GEW"
                },
                {
                    "key": "7DER",
                    "value": "7DER"
                },
                {
                    "key": "7DEL",
                    "value": "7DEL"
                },
                {
                    "key": "7BEL",
                    "value": "7BEL"
                },
                {
                    "key": "7WST",
                    "value": "7WST"
                },
                {
                    "key": "7WIN",
                    "value": "7WIN"
                },
                {
                    "key": "7ULN",
                    "value": "7ULN"
                },
                {
                    "key": "7SHL",
                    "value": "7SHL"
                },
                {
                    "key": "7PEI",
                    "value": "7PEI"
                },
                {
                    "key": "7EXE",
                    "value": "7EXE"
                },
                {
                    "key": "7EVA",
                    "value": "7EVA"
                },
                {
                    "key": "7ETD",
                    "value": "7ETD"
                }
            ]
        },
        {
            "ctrlId": "Leeman Region",
            "lookups": [
                {
                    "key": "6JUR",
                    "value": "6JUR"
                },
                {
                    "key": "6DNG",
                    "value": "6DNG"
                },
                {
                    "key": "6LEA",
                    "value": "6LEA"
                },
                {
                    "key": "6CER",
                    "value": "6CER"
                }
            ]
        },
        {
            "ctrlId": "Lilydale CSA",
            "lookups": [
                {
                    "key": "3WAD",
                    "value": "3WAD"
                },
                {
                    "key": "3WOR",
                    "value": "3WOR"
                },
                {
                    "key": "3WSE",
                    "value": "3WSE"
                }
            ]
        },
        {
            "ctrlId": "Lismore Region",
            "lookups": [
                {
                    "key": "2LIS",
                    "value": "2LIS"
                },
                {
                    "key": "2KYO",
                    "value": "2KYO"
                },
                {
                    "key": "2CSN",
                    "value": "2CSN"
                }
            ]
        },
        {
            "ctrlId": "Lithgow Region",
            "lookups": [
                {
                    "key": "2OBO",
                    "value": "2OBO"
                },
                {
                    "key": "2BTH",
                    "value": "2BTH"
                },
                {
                    "key": "2WAL",
                    "value": "2WAL"
                },
                {
                    "key": "2POR",
                    "value": "2POR"
                },
                {
                    "key": "2LTG",
                    "value": "2LTG"
                }
            ]
        },
        {
            "ctrlId": "Longreach Region",
            "lookups": [
                {
                    "key": "4WTN",
                    "value": "4WTN"
                },
                {
                    "key": "4LRC",
                    "value": "4LRC"
                }
            ]
        },
        {
            "ctrlId": "Mackay Region",
            "lookups": [
                {
                    "key": "4SAR",
                    "value": "4SAR"
                },
                {
                    "key": "4MRN",
                    "value": "4MRN"
                },
                {
                    "key": "4MKY",
                    "value": "4MKY"
                },
                {
                    "key": "4WLK",
                    "value": "4WLK"
                },
                {
                    "key": "4SFT",
                    "value": "4SFT"
                },
                {
                    "key": "4NMK",
                    "value": "4NMK"
                },
                {
                    "key": "4HYP",
                    "value": "4HYP"
                },
                {
                    "key": "4BUC",
                    "value": "4BUC"
                }
            ]
        },
        {
            "ctrlId": "Maitland CSA",
            "lookups": [
                {
                    "key": "2MAI",
                    "value": "2MAI"
                },
                {
                    "key": "2RTC",
                    "value": "2RTC"
                },
                {
                    "key": "2SIN",
                    "value": "2SIN"
                }
            ]
        },
        {
            "ctrlId": "Maitland Region",
            "lookups": [
                {
                    "key": "5MTL",
                    "value": "5MTL"
                },
                {
                    "key": "5KDN",
                    "value": "5KDN"
                },
                {
                    "key": "5ARD",
                    "value": "5ARD"
                },
                {
                    "key": "5MTA",
                    "value": "5MTA"
                }
            ]
        },
        {
            "ctrlId": "Mallacoota Region",
            "lookups": [
                {
                    "key": "3MCT",
                    "value": "3MCT"
                }
            ]
        },
        {
            "ctrlId": "Mansfield Region",
            "lookups": [
                {
                    "key": "3MFL",
                    "value": "3MFL"
                },
                {
                    "key": "3AXD",
                    "value": "3AXD"
                },
                {
                    "key": "3YEA",
                    "value": "3YEA"
                },
                {
                    "key": "3ELD",
                    "value": "3ELD"
                }
            ]
        },
        {
            "ctrlId": "Mareeba Region",
            "lookups": [
                {
                    "key": "4MEB",
                    "value": "4MEB"
                }
            ]
        },
        {
            "ctrlId": "Maryborough Region",
            "lookups": [
                {
                    "key": "4RVH",
                    "value": "4RVH"
                },
                {
                    "key": "4MBO",
                    "value": "4MBO"
                },
                {
                    "key": "4HWR",
                    "value": "4HWR"
                },
                {
                    "key": "4CHR",
                    "value": "4CHR"
                },
                {
                    "key": "4WOT",
                    "value": "4WOT"
                },
                {
                    "key": "4TQA",
                    "value": "4TQA"
                },
                {
                    "key": "4BUM",
                    "value": "4BUM"
                }
            ]
        },
        {
            "ctrlId": "Mayfield Region",
            "lookups": [
                {
                    "key": "2WLL",
                    "value": "2WLL"
                },
                {
                    "key": "2NLB",
                    "value": "2NLB"
                },
                {
                    "key": "2MYF",
                    "value": "2MYF"
                },
                {
                    "key": "2MDW",
                    "value": "2MDW"
                }
            ]
        },
        {
            "ctrlId": "Meningie Region",
            "lookups": [
                {
                    "key": "5MGI",
                    "value": "5MGI"
                }
            ]
        },
        {
            "ctrlId": "Merredin Region",
            "lookups": [
                {
                    "key": "6MDI",
                    "value": "6MDI"
                }
            ]
        },
        {
            "ctrlId": "Merrimac",
            "lookups": [
                {
                    "key": "4CUR",
                    "value": "4CUR"
                }
            ]
        },
        {
            "ctrlId": "Merrimac CSA",
            "lookups": [
                {
                    "key": "4RBN",
                    "value": "4RBN"
                }
            ]
        },
        {
            "ctrlId": "Mitchell Region",
            "lookups": [
                {
                    "key": "4MIT",
                    "value": "4MIT"
                },
                {
                    "key": "4CHV",
                    "value": "4CHV"
                }
            ]
        },
        {
            "ctrlId": "Monto Region",
            "lookups": [
                {
                    "key": "4MNT",
                    "value": "4MNT"
                },
                {
                    "key": "4MBR",
                    "value": "4MBR"
                },
                {
                    "key": "4GAY",
                    "value": "4GAY"
                }
            ]
        },
        {
            "ctrlId": "Moranbah Region",
            "lookups": [
                {
                    "key": "4MNB",
                    "value": "4MNB"
                },
                {
                    "key": "4TIE",
                    "value": "4TIE"
                },
                {
                    "key": "4MIM",
                    "value": "4MIM"
                },
                {
                    "key": "4DYS",
                    "value": "4DYS"
                },
                {
                    "key": "4CLE",
                    "value": "4CLE"
                },
                {
                    "key": "4CAP",
                    "value": "4CAP"
                }
            ]
        },
        {
            "ctrlId": "Mossman Region",
            "lookups": [
                {
                    "key": "4WNB",
                    "value": "4WNB"
                },
                {
                    "key": "4MOS",
                    "value": "4MOS"
                },
                {
                    "key": "4PDS",
                    "value": "4PDS"
                }
            ]
        },
        {
            "ctrlId": "Mount Eliza CSA",
            "lookups": [
                {
                    "key": "3DRO",
                    "value": "3DRO"
                }
            ]
        },
        {
            "ctrlId": "Mount Gambier Region",
            "lookups": [
                {
                    "key": "5PEL",
                    "value": "5PEL"
                },
                {
                    "key": "5MTG",
                    "value": "5MTG"
                },
                {
                    "key": "5MIC",
                    "value": "5MIC"
                },
                {
                    "key": "5BPT",
                    "value": "5BPT"
                }
            ]
        },
        {
            "ctrlId": "Mount Isa Region",
            "lookups": [
                {
                    "key": "4MTI",
                    "value": "4MTI"
                },
                {
                    "key": "4CLO",
                    "value": "4CLO"
                }
            ]
        },
        {
            "ctrlId": "Moura Region",
            "lookups": [
                {
                    "key": "4BIL",
                    "value": "4BIL"
                },
                {
                    "key": "4MOU",
                    "value": "4MOU"
                }
            ]
        },
        {
            "ctrlId": "Mudgee Region",
            "lookups": [
                {
                    "key": "2MDG",
                    "value": "2MDG"
                },
                {
                    "key": "2GUL",
                    "value": "2GUL"
                },
                {
                    "key": "2KND",
                    "value": "2KND"
                }
            ]
        },
        {
            "ctrlId": "Mullaloo CSA",
            "lookups": [
                {
                    "key": "6QIN",
                    "value": "6QIN"
                }
            ]
        },
        {
            "ctrlId": "Murrurundi Region",
            "lookups": [
                {
                    "key": "2SCO",
                    "value": "2SCO"
                },
                {
                    "key": "2QIR",
                    "value": "2QIR"
                },
                {
                    "key": "2MUS",
                    "value": "2MUS"
                },
                {
                    "key": "2WSC",
                    "value": "2WSC"
                },
                {
                    "key": "2MRD",
                    "value": "2MRD"
                },
                {
                    "key": "2DNM",
                    "value": "2DNM"
                }
            ]
        },
        {
            "ctrlId": "Nambour Region",
            "lookups": [
                {
                    "key": "4YIN",
                    "value": "4YIN"
                },
                {
                    "key": "4POM",
                    "value": "4POM"
                },
                {
                    "key": "4NBR",
                    "value": "4NBR"
                },
                {
                    "key": "4MAL",
                    "value": "4MAL"
                },
                {
                    "key": "4WUR",
                    "value": "4WUR"
                },
                {
                    "key": "4NOO",
                    "value": "4NOO"
                },
                {
                    "key": "4MYD",
                    "value": "4MYD"
                },
                {
                    "key": "4FLA",
                    "value": "4FLA"
                },
                {
                    "key": "4CLM",
                    "value": "4CLM"
                },
                {
                    "key": "4BUD",
                    "value": "4BUD"
                },
                {
                    "key": "4BLI",
                    "value": "4BLI"
                }
            ]
        },
        {
            "ctrlId": "Naracoorte Region",
            "lookups": [
                {
                    "key": "5NAR",
                    "value": "5NAR"
                },
                {
                    "key": "5ROB",
                    "value": "5ROB"
                },
                {
                    "key": "5KGS",
                    "value": "5KGS"
                }
            ]
        },
        {
            "ctrlId": "Narrabri Region",
            "lookups": [
                {
                    "key": "2WWA",
                    "value": "2WWA"
                },
                {
                    "key": "2NBR",
                    "value": "2NBR"
                },
                {
                    "key": "2BGI",
                    "value": "2BGI"
                }
            ]
        },
        {
            "ctrlId": "Narrogin Region",
            "lookups": [
                {
                    "key": "6PNG",
                    "value": "6PNG"
                },
                {
                    "key": "6NRG",
                    "value": "6NRG"
                },
                {
                    "key": "6BKT",
                    "value": "6BKT"
                }
            ]
        },
        {
            "ctrlId": "Newman Region",
            "lookups": [
                {
                    "key": "6NWM",
                    "value": "6NWM"
                }
            ]
        },
        {
            "ctrlId": "Ningi CSA",
            "lookups": [
                {
                    "key": "4BRW",
                    "value": "4BRW"
                },
                {
                    "key": "4CAB",
                    "value": "4CAB"
                },
                {
                    "key": "4DYB",
                    "value": "4DYB"
                },
                {
                    "key": "4KLC",
                    "value": "4KLC"
                },
                {
                    "key": "4NIN",
                    "value": "4NIN"
                },
                {
                    "key": "4WDF",
                    "value": "4WDF"
                }
            ]
        },
        {
            "ctrlId": "Norseman Region",
            "lookups": [
                {
                    "key": "6NSM",
                    "value": "6NSM"
                }
            ]
        },
        {
            "ctrlId": "Nowra Bomaderry Region",
            "lookups": [
                {
                    "key": "2NWR",
                    "value": "2NWR"
                },
                {
                    "key": "2SHO",
                    "value": "2SHO"
                },
                {
                    "key": "2KIA",
                    "value": "2KIA"
                },
                {
                    "key": "2GRE",
                    "value": "2GRE"
                },
                {
                    "key": "2GER",
                    "value": "2GER"
                },
                {
                    "key": "2CUR",
                    "value": "2CUR"
                },
                {
                    "key": "2CAL",
                    "value": "2CAL"
                },
                {
                    "key": "2BRY",
                    "value": "2BRY"
                },
                {
                    "key": "2ABN",
                    "value": "2ABN"
                }
            ]
        },
        {
            "ctrlId": "Orange Region",
            "lookups": [
                {
                    "key": "2ORG",
                    "value": "2ORG"
                },
                {
                    "key": "2MOL",
                    "value": "2MOL"
                },
                {
                    "key": "2BLA",
                    "value": "2BLA"
                }
            ]
        },
        {
            "ctrlId": "Paraburdoo Region",
            "lookups": [
                {
                    "key": "6TPC",
                    "value": "6TPC"
                },
                {
                    "key": "6PDO",
                    "value": "6PDO"
                }
            ]
        },
        {
            "ctrlId": "Penrith CSA",
            "lookups": [
                {
                    "key": "2MVI",
                    "value": "2MVI"
                },
                {
                    "key": "2PTH",
                    "value": "2PTH"
                }
            ]
        },
        {
            "ctrlId": "Pinjarra Region",
            "lookups": [
                {
                    "key": "6PRE",
                    "value": "6PRE"
                },
                {
                    "key": "6PNJ",
                    "value": "6PNJ"
                },
                {
                    "key": "6YND",
                    "value": "6YND"
                },
                {
                    "key": "6WRN",
                    "value": "6WRN"
                },
                {
                    "key": "6PJW",
                    "value": "6PJW"
                },
                {
                    "key": "6MSP",
                    "value": "6MSP"
                },
                {
                    "key": "6MDR",
                    "value": "6MDR"
                },
                {
                    "key": "6HER",
                    "value": "6HER"
                }
            ]
        },
        {
            "ctrlId": "Port Augusta Region",
            "lookups": [
                {
                    "key": "5QUR",
                    "value": "5QUR"
                },
                {
                    "key": "5PTA",
                    "value": "5PTA"
                }
            ]
        },
        {
            "ctrlId": "Port Hedland Region",
            "lookups": [
                {
                    "key": "6PHE",
                    "value": "6PHE"
                }
            ]
        },
        {
            "ctrlId": "Port Lincoln Region",
            "lookups": [
                {
                    "key": "5PTL",
                    "value": "5PTL"
                },
                {
                    "key": "5TYB",
                    "value": "5TYB"
                }
            ]
        },
        {
            "ctrlId": "Port Macquarie Region",
            "lookups": [
                {
                    "key": "2WAU",
                    "value": "2WAU"
                },
                {
                    "key": "2TEE",
                    "value": "2TEE"
                },
                {
                    "key": "2KMS",
                    "value": "2KMS"
                },
                {
                    "key": "2HAR",
                    "value": "2HAR"
                },
                {
                    "key": "2PTM",
                    "value": "2PTM"
                },
                {
                    "key": "2OBA",
                    "value": "2OBA"
                },
                {
                    "key": "2LCT",
                    "value": "2LCT"
                },
                {
                    "key": "2CTH",
                    "value": "2CTH"
                },
                {
                    "key": "2CAH",
                    "value": "2CAH"
                }
            ]
        },
        {
            "ctrlId": "Port Pirie Region",
            "lookups": [
                {
                    "key": "5PTG",
                    "value": "5PTG"
                },
                {
                    "key": "5PIR",
                    "value": "5PIR"
                },
                {
                    "key": "5JAM",
                    "value": "5JAM"
                }
            ]
        },
        {
            "ctrlId": "Portland Region",
            "lookups": [
                {
                    "key": "3PRL",
                    "value": "3PRL"
                },
                {
                    "key": "3HYW",
                    "value": "3HYW"
                }
            ]
        },
        {
            "ctrlId": "Queanbeyan CSA",
            "lookups": [
                {
                    "key": "2BAO",
                    "value": "2BAO"
                },
                {
                    "key": "2BOM",
                    "value": "2BOM"
                },
                {
                    "key": "2COM",
                    "value": "2COM"
                },
                {
                    "key": "2JNB",
                    "value": "2JNB"
                }
            ]
        },
        {
            "ctrlId": "Red Cliffs Region",
            "lookups": [
                {
                    "key": "3REF",
                    "value": "3REF"
                },
                {
                    "key": "2WEN",
                    "value": "2WEN"
                },
                {
                    "key": "3MDU",
                    "value": "3MDU"
                }
            ]
        },
        {
            "ctrlId": "Richmond CSA",
            "lookups": [
                {
                    "key": "2PIT",
                    "value": "2PIT"
                },
                {
                    "key": "2URR",
                    "value": "2URR"
                },
                {
                    "key": "2WFC",
                    "value": "2WFC"
                }
            ]
        },
        {
            "ctrlId": "Robinvale Region",
            "lookups": [
                {
                    "key": "3ROL",
                    "value": "3ROL"
                },
                {
                    "key": "2BRL",
                    "value": "2BRL"
                }
            ]
        },
        {
            "ctrlId": "Rockhampton Region",
            "lookups": [
                {
                    "key": "4ROT",
                    "value": "4ROT"
                },
                {
                    "key": "4MTM",
                    "value": "4MTM"
                },
                {
                    "key": "4LAM",
                    "value": "4LAM"
                },
                {
                    "key": "4PRK",
                    "value": "4PRK"
                },
                {
                    "key": "4GRA",
                    "value": "4GRA"
                },
                {
                    "key": "4FRV",
                    "value": "4FRV"
                },
                {
                    "key": "4EPK",
                    "value": "4EPK"
                }
            ]
        },
        {
            "ctrlId": "Roma Region",
            "lookups": [
                {
                    "key": "4ROM",
                    "value": "4ROM"
                }
            ]
        },
        {
            "ctrlId": "Sale Region",
            "lookups": [
                {
                    "key": "3SAL",
                    "value": "3SAL"
                },
                {
                    "key": "3HYF",
                    "value": "3HYF"
                },
                {
                    "key": "3STR",
                    "value": "3STR"
                },
                {
                    "key": "3RDL",
                    "value": "3RDL"
                },
                {
                    "key": "3LSP",
                    "value": "3LSP"
                }
            ]
        },
        {
            "ctrlId": "Scottsdale Region",
            "lookups": [
                {
                    "key": "7SCE",
                    "value": "7SCE"
                },
                {
                    "key": "7BDP",
                    "value": "7BDP"
                },
                {
                    "key": "7SCL",
                    "value": "7SCL"
                }
            ]
        },
        {
            "ctrlId": "Shepparton Region",
            "lookups": [
                {
                    "key": "3BNL",
                    "value": "3BNL"
                },
                {
                    "key": "3ECH",
                    "value": "3ECH"
                },
                {
                    "key": "3EUR",
                    "value": "3EUR"
                },
                {
                    "key": "3KYA",
                    "value": "3KYA"
                },
                {
                    "key": "3NAG",
                    "value": "3NAG"
                },
                {
                    "key": "3NAT",
                    "value": "3NAT"
                },
                {
                    "key": "3NMK",
                    "value": "3NMK"
                },
                {
                    "key": "3SHP",
                    "value": "3SHP"
                },
                {
                    "key": "3RUW",
                    "value": "3RUW"
                },
                {
                    "key": "3TAT",
                    "value": "3TAT"
                }
            ]
        },
        {
            "ctrlId": "Smiths Lake Region",
            "lookups": [
                {
                    "key": "2SLK",
                    "value": "2SLK"
                },
                {
                    "key": "2FOE",
                    "value": "2FOE"
                },
                {
                    "key": "2CPK",
                    "value": "2CPK"
                }
            ]
        },
        {
            "ctrlId": "Smithton Region",
            "lookups": [
                {
                    "key": "7WYN",
                    "value": "7WYN"
                },
                {
                    "key": "7SMO",
                    "value": "7SMO"
                },
                {
                    "key": "7BUI",
                    "value": "7BUI"
                },
                {
                    "key": "7SOE",
                    "value": "7SOE"
                }
            ]
        },
        {
            "ctrlId": "Sorell Region",
            "lookups": [
                {
                    "key": "7SOR",
                    "value": "7SOR"
                },
                {
                    "key": "7DSF",
                    "value": "7DSF"
                },
                {
                    "key": "7RIC",
                    "value": "7RIC"
                },
                {
                    "key": "7CAM",
                    "value": "7CAM"
                }
            ]
        },
        {
            "ctrlId": "South Morang CSA",
            "lookups": [
                {
                    "key": "3HUR",
                    "value": "3HUR"
                },
                {
                    "key": "3KAK",
                    "value": "3KAK"
                }
            ]
        },
        {
            "ctrlId": "Southern Cross Region",
            "lookups": [
                {
                    "key": "6SCR",
                    "value": "6SCR"
                }
            ]
        },
        {
            "ctrlId": "St George Region",
            "lookups": [
                {
                    "key": "4STG",
                    "value": "4STG"
                }
            ]
        },
        {
            "ctrlId": "St Helens Region",
            "lookups": [
                {
                    "key": "7SWA",
                    "value": "7SWA"
                },
                {
                    "key": "7STH",
                    "value": "7STH"
                },
                {
                    "key": "7SCA",
                    "value": "7SCA"
                },
                {
                    "key": "7BIC",
                    "value": "7BIC"
                }
            ]
        },
        {
            "ctrlId": "Stansbury Region",
            "lookups": [
                {
                    "key": "5YOW",
                    "value": "5YOW"
                },
                {
                    "key": "5STY",
                    "value": "5STY"
                },
                {
                    "key": "5MNL",
                    "value": "5MNL"
                }
            ]
        },
        {
            "ctrlId": "Stirling Region",
            "lookups": [
                {
                    "key": "5TMB",
                    "value": "5TMB"
                },
                {
                    "key": "5STI",
                    "value": "5STI"
                },
                {
                    "key": "5MYB",
                    "value": "5MYB"
                },
                {
                    "key": "5MNN",
                    "value": "5MNN"
                },
                {
                    "key": "5MCF",
                    "value": "5MCF"
                },
                {
                    "key": "5LEN",
                    "value": "5LEN"
                },
                {
                    "key": "5SBY",
                    "value": "5SBY"
                },
                {
                    "key": "5MTB",
                    "value": "5MTB"
                },
                {
                    "key": "5BDW",
                    "value": "5BDW"
                }
            ]
        },
        {
            "ctrlId": "Sunbury Region",
            "lookups": [
                {
                    "key": "3KYN",
                    "value": "3KYN"
                },
                {
                    "key": "3MAD",
                    "value": "3MAD"
                },
                {
                    "key": "3SUN",
                    "value": "3SUN"
                },
                {
                    "key": "3TRE",
                    "value": "3TRE"
                },
                {
                    "key": "3RMS",
                    "value": "3RMS"
                }
            ]
        },
        {
            "ctrlId": "Tamworth Region",
            "lookups": [
                {
                    "key": "2TAM",
                    "value": "2TAM"
                },
                {
                    "key": "2MAN",
                    "value": "2MAN"
                },
                {
                    "key": "2GUN",
                    "value": "2GUN"
                },
                {
                    "key": "2KOO",
                    "value": "2KOO"
                }
            ]
        },
        {
            "ctrlId": "Temora Region",
            "lookups": [
                {
                    "key": "2TEM",
                    "value": "2TEM"
                },
                {
                    "key": "2NDR",
                    "value": "2NDR"
                },
                {
                    "key": "2JUE",
                    "value": "2JUE"
                },
                {
                    "key": "2CLM",
                    "value": "2CLM"
                }
            ]
        },
        {
            "ctrlId": "Tenterfield Region",
            "lookups": [
                {
                    "key": "2TTF",
                    "value": "2TTF"
                },
                {
                    "key": "2GNI",
                    "value": "2GNI"
                }
            ]
        },
        {
            "ctrlId": "Toowoomba Region",
            "lookups": [
                {
                    "key": "4TOB",
                    "value": "4TOB"
                },
                {
                    "key": "4CLI",
                    "value": "4CLI"
                },
                {
                    "key": "4MMR",
                    "value": "4MMR"
                },
                {
                    "key": "4PWT",
                    "value": "4PWT"
                },
                {
                    "key": "4OKE",
                    "value": "4OKE"
                },
                {
                    "key": "4NEW",
                    "value": "4NEW"
                },
                {
                    "key": "4KTP",
                    "value": "4KTP"
                },
                {
                    "key": "4HFD",
                    "value": "4HFD"
                },
                {
                    "key": "4CAM",
                    "value": "4CAM"
                },
                {
                    "key": "4ALL",
                    "value": "4ALL"
                }
            ]
        },
        {
            "ctrlId": "Townsville Region",
            "lookups": [
                {
                    "key": "4KIR",
                    "value": "4KIR"
                },
                {
                    "key": "4IGH",
                    "value": "4IGH"
                },
                {
                    "key": "4DEG",
                    "value": "4DEG"
                },
                {
                    "key": "4WLG",
                    "value": "4WLG"
                },
                {
                    "key": "4TNS",
                    "value": "4TNS"
                },
                {
                    "key": "4RLS",
                    "value": "4RLS"
                },
                {
                    "key": "4MAG",
                    "value": "4MAG"
                },
                {
                    "key": "4GUL",
                    "value": "4GUL"
                },
                {
                    "key": "4ALC",
                    "value": "4ALC"
                }
            ]
        },
        {
            "ctrlId": "Trangie Region",
            "lookups": [
                {
                    "key": "2WRR",
                    "value": "2WRR"
                },
                {
                    "key": "2TRG",
                    "value": "2TRG"
                },
                {
                    "key": "2NMN",
                    "value": "2NMN"
                }
            ]
        },
        {
            "ctrlId": "Traralgon Region",
            "lookups": [
                {
                    "key": "3TAG",
                    "value": "3TAG"
                },
                {
                    "key": "3CHH",
                    "value": "3CHH"
                },
                {
                    "key": "3MWR",
                    "value": "3MWR"
                },
                {
                    "key": "3MBN",
                    "value": "3MBN"
                }
            ]
        },
        {
            "ctrlId": "Triabunna Region",
            "lookups": [
                {
                    "key": "7TRA",
                    "value": "7TRA"
                },
                {
                    "key": "7ORF",
                    "value": "7ORF"
                }
            ]
        },
        {
            "ctrlId": "Tumut Region",
            "lookups": [
                {
                    "key": "2TUM",
                    "value": "2TUM"
                },
                {
                    "key": "2TRB",
                    "value": "2TRB"
                },
                {
                    "key": "2BTL",
                    "value": "2BTL"
                },
                {
                    "key": "2GDA",
                    "value": "2GDA"
                },
                {
                    "key": "2ADL",
                    "value": "2ADL"
                }
            ]
        },
        {
            "ctrlId": "Wagga Wagga Region",
            "lookups": [
                {
                    "key": "2WAG",
                    "value": "2WAG"
                },
                {
                    "key": "2TRK",
                    "value": "2TRK"
                },
                {
                    "key": "2HOL",
                    "value": "2HOL"
                },
                {
                    "key": "2CUL",
                    "value": "2CUL"
                },
                {
                    "key": "2KRG",
                    "value": "2KRG"
                },
                {
                    "key": "2HEN",
                    "value": "2HEN"
                }
            ]
        },
        {
            "ctrlId": "Wagin Region",
            "lookups": [
                {
                    "key": "6WGI",
                    "value": "6WGI"
                }
            ]
        },
        {
            "ctrlId": "Waikerie Region",
            "lookups": [
                {
                    "key": "5WKR",
                    "value": "5WKR"
                }
            ]
        },
        {
            "ctrlId": "Walgett Region",
            "lookups": [
                {
                    "key": "2LIT",
                    "value": "2LIT"
                },
                {
                    "key": "2WLE",
                    "value": "2WLE"
                }
            ]
        },
        {
            "ctrlId": "Wangaratta Region",
            "lookups": [
                {
                    "key": "3WAN",
                    "value": "3WAN"
                },
                {
                    "key": "3MYF",
                    "value": "3MYF"
                },
                {
                    "key": "3BWT",
                    "value": "3BWT"
                }
            ]
        },
        {
            "ctrlId": "Warialda Region",
            "lookups": [
                {
                    "key": "2WRD",
                    "value": "2WRD"
                },
                {
                    "key": "2MRE",
                    "value": "2MRE"
                },
                {
                    "key": "2BIN",
                    "value": "2BIN"
                }
            ]
        },
        {
            "ctrlId": "Warracknabeal Region",
            "lookups": [
                {
                    "key": "3WKB",
                    "value": "3WKB"
                },
                {
                    "key": "3OUY",
                    "value": "3OUY"
                }
            ]
        },
        {
            "ctrlId": "Warrnambool Region",
            "lookups": [
                {
                    "key": "3WBO",
                    "value": "3WBO"
                },
                {
                    "key": "3MTK",
                    "value": "3MTK"
                },
                {
                    "key": "3POF",
                    "value": "3POF"
                },
                {
                    "key": "3KOR",
                    "value": "3KOR"
                }
            ]
        },
        {
            "ctrlId": "Warwick Region",
            "lookups": [
                {
                    "key": "4WRW",
                    "value": "4WRW"
                },
                {
                    "key": "4STP",
                    "value": "4STP"
                }
            ]
        },
        {
            "ctrlId": "Weipa Region",
            "lookups": [
                {
                    "key": "4WEP",
                    "value": "4WEP"
                }
            ]
        },
        {
            "ctrlId": "West Wyalong Region",
            "lookups": [
                {
                    "key": "2WWY",
                    "value": "2WWY"
                },
                {
                    "key": "2CON",
                    "value": "2CON"
                }
            ]
        },
        {
            "ctrlId": "Whyalla Region",
            "lookups": [
                {
                    "key": "5WHL",
                    "value": "5WHL"
                }
            ]
        },
        {
            "ctrlId": "Winchelsea Region",
            "lookups": [
                {
                    "key": "3WIN",
                    "value": "3WIN"
                },
                {
                    "key": "3ASE",
                    "value": "3ASE"
                },
                {
                    "key": "3LOR",
                    "value": "3LOR"
                }
            ]
        },
        {
            "ctrlId": "Woodburn Region",
            "lookups": [
                {
                    "key": "2WDB",
                    "value": "2WDB"
                },
                {
                    "key": "2MUL",
                    "value": "2MUL"
                },
                {
                    "key": "2ALS",
                    "value": "2ALS"
                },
                {
                    "key": "2WAD",
                    "value": "2WAD"
                },
                {
                    "key": "2ESH",
                    "value": "2ESH"
                },
                {
                    "key": "2CRK",
                    "value": "2CRK"
                },
                {
                    "key": "2BYB",
                    "value": "2BYB"
                },
                {
                    "key": "2BLN",
                    "value": "2BLN"
                }
            ]
        },
        {
            "ctrlId": "Woomera Region",
            "lookups": [
                {
                    "key": "5WOO",
                    "value": "5WOO"
                },
                {
                    "key": "5RBY",
                    "value": "5RBY"
                }
            ]
        },
        {
            "ctrlId": "Yanchep Region",
            "lookups": [
                {
                    "key": "6LNC",
                    "value": "6LNC"
                },
                {
                    "key": "6YAN",
                    "value": "6YAN"
                },
                {
                    "key": "6WDE",
                    "value": "6WDE"
                }
            ]
        },
        {
            "ctrlId": "Yankalilla Region",
            "lookups": [
                {
                    "key": "5YKL",
                    "value": "5YKL"
                },
                {
                    "key": "5PTE",
                    "value": "5PTE"
                },
                {
                    "key": "5ONK",
                    "value": "5ONK"
                },
                {
                    "key": "5GLW",
                    "value": "5GLW"
                },
                {
                    "key": "5SFD",
                    "value": "5SFD"
                },
                {
                    "key": "5MTC",
                    "value": "5MTC"
                },
                {
                    "key": "5ALD",
                    "value": "5ALD"
                }
            ]
        },
        {
            "ctrlId": "Yass Region",
            "lookups": [
                {
                    "key": "2YAS",
                    "value": "2YAS"
                },
                {
                    "key": "2MBT",
                    "value": "2MBT"
                },
                {
                    "key": "2BOW",
                    "value": "2BOW"
                }
            ]
        },
        {
            "ctrlId": "Young Region",
            "lookups": [
                {
                    "key": "2YON",
                    "value": "2YON"
                },
                {
                    "key": "2CTM",
                    "value": "2CTM"
                },
                {
                    "key": "2HRD",
                    "value": "2HRD"
                }
            ]
        },
        {
            "ctrlId": "Zeehan Region",
            "lookups": [
                {
                    "key": "7ZEA",
                    "value": "7ZEA"
                },
                {
                    "key": "7ROR",
                    "value": "7ROR"
                },
                {
                    "key": "7QUW",
                    "value": "7QUW"
                }
            ]
        }
    ];

    public static getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static getRandomSecondaryPhone() {
        return "+611900654302";
    }

    public static getRandomPrimaryPhone() {
        return "+611900654301";
    }

    public static getRandomSecondaryMobile() {
        return "+61422100102";
    }

    public static getRandomPrimaryMobile() {
        return "+61422100101";
    }

    public static getRandomEmail() {
        return "test_" + AppUtil.getRandomInt(1, 5000) + "@starwars.com";
    }

    public static getRandomName() {
        var name = AppUtil.names[AppUtil.getRandomInt(0, AppUtil.names.length)];
        console.log(">>> generated name ", name);
        return name;
    }

    public static print() {
        console.log('print' + moment());
    }

    public static updateNextId(key: string, value: number) {
        var idLookups = AppUtil.getLocalStorage("et.idLookups");
        if (!idLookups) {
            idLookups = {
                "sTagVid": 14,
                "cTagVid": 811,
            };
        }

        if (!idLookups["sVlanId"]) {
            idLookups["sVlanId"] = 114;
            idLookups["cVlanId"] = 1811;
        }

        if (idLookups[key]) {
            if (idLookups[key] !== value) {
                idLookups[key] = value;
            }
            AppUtil.setLocalStorage("et.idLookups", idLookups);
        }
    }


    public static getNextId(key: string, min: number, max: number): number {
        var output = 0;

        var idLookups = AppUtil.getLocalStorage("et.idLookups");
        if (!idLookups) {
            idLookups = {
                "sTagVid": 14,
                "cTagVid": 811
            };
            if (key !== "sTagVid" && key !== "cTagVid") {
                idLookups[key] = AppUtil.getRandomInt(min, max);
            }
        }

        if (!idLookups["sVlanId"]) {
            idLookups["sVlanId"] = 114;
            idLookups["cVlanId"] = 1811;
        }

        output = (idLookups[key] + 1);
        idLookups[key] = output;
        AppUtil.setLocalStorage("et.idLookups", idLookups);
        return output;
    }

    public static generateUniqueId(prefix: string): string {
        var output = "";

        var randomId = Math.floor(100000000000 + Math.random() * 900000000000);
        // var randomId = '' + Math.random().toString(36).substr(2, 9);
        output = prefix + randomId;
        return output;
    }

    public static uuidv4(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    public static getTodayFormattedString(format: string) {
        var now = new Date();
        var output = moment(now).format(format);
        return output;
    }

    public static formatDate(stringDate: string, sourceFormat: string, targetFormat: string) {
        var output = "";
        if (sourceFormat) {
            output = moment(stringDate, sourceFormat).format(targetFormat);
        }
        else {
            output = moment(stringDate).format(targetFormat);            
        }
        return output;
    }

    public static formatDateDefaultFormat(stringDate: string) {
        return AppUtil.formatDate(stringDate, 'YYYYMMDD', 'DD-MM-YYYY');
    }

    public static getDateAfter(dateStr, unit, duration, format) {
        var output = moment(dateStr).add(duration, unit).format(format);
        return output;
    }

    public static getDateBeforeToday(unit, duration, format) {
        var now = new Date();
        if (!format) {
            format = "YYYYMMDD";
        }
        var output = moment(now).subtract(duration, unit).format(format);
        return output;
    }

    public static getLocalStorage(key: string): any {
        var output = null;
        var bufferString = localStorage.getItem(key);
        if (bufferString) {
            output = JSON.parse(bufferString);
        }
        return output;
    }

    public static setLocalStorage(key: string, buffer: any): void {
        var data = JSON.stringify(buffer);
        localStorage.setItem(key, data);
    }

    public static getSessionStorage(key: string): any {
        var output = null;
        var bufferString = sessionStorage.getItem(key);
        if (bufferString) {
            output = JSON.parse(bufferString);
        }
        return output;
    }

    public static jsonEqual(a: any, b: any): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    public static setSessionStorage(key: string, data: any): void {
        var bufferString = JSON.stringify(data);
        sessionStorage.setItem(key, bufferString);
    }

    public static showError(dialog: MatDialog, title: string, msg: string, detail: string) {
        dialog.open(ErrorDialogComponent, {
            data: {
                title: title,
                msg: msg,
                detail: detail
            },
            width: '300px',
            height: '200px',
            panelClass: 'epsErrorPanel'
        });
    }

    public static showInfo(dialog: MatDialog, title, msg: string, detail: string) {
        dialog.open(InfoDialogComponent, {
            data: {
                title: title,
                msg: msg,
                detail: detail
            },
            width: '300px',
            height: '200px',
            panelClass: 'epsInfoPanel'
        });
    }

    public static showMySelector(dialog: MatDialog, onSuccess) {
        /* for future
        let dialogRef = dialog.open(MySelectorComponent, {
            data: {
                title: "My Selector"
            },
            width: '600px',
            height: '600px',
            panelClass: 'epsSelectorPanel',
            disableClose: true            
        });
        dialogRef.afterClosed().subscribe(formData => {
            if (formData) {
                onSuccess(formData);
            }
        }); /* */

    }


    public static getSelectedClass(ok: boolean, suffix: string): string {
        var className = ok ? "SELECTED" : "UNSELECTED";
        className = className + "-" + suffix;
        return className;
    }

    public static getChangedClass(form: FormGroup, savedForm: any, key: string): string {
        var className = null;
        if (savedForm) {
            var value1 = form.controls[key].value;
            var value2 = savedForm[key];
            if (value1 !== value2) {
                className = "CHANGED";
            }
        }
        return className;

    }

    public static getWirelessRegions(): string[] {
        var regions = [];
        for (var regionIdx = 0; regionIdx < AppUtil.wsas.length; regionIdx++) {
            var wsaItem = AppUtil.wsas[regionIdx];
            regions.push (wsaItem.ctrlId);
        }
        return regions;
    } 

    public static getWirelessWsa(regionName : string): any[] {
        var wsas = [];
        for (var regionIdx = 0; regionIdx < AppUtil.wsas.length; regionIdx++) {
            var wsaItem = AppUtil.wsas[regionIdx];
            if (wsaItem.ctrlId === regionName) {
                wsas = wsaItem.lookups;
                break;
            }
        }
        return wsas;
    } 
    
}