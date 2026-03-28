// @ts-nocheck
import { useState } from "react";
import { ChevronRight, ChevronLeft, Check, GraduationCap, Wine, Heart, Droplets, Gift, Coffee, Cake, Utensils, GlassWater, Snowflake, ChefHat, Sandwich, Palette, Send, MessageCircle, Mail, CheckCircle2, Clock, ArrowRight, Phone, User, Calendar, School, Users, Star, Sparkles, Crown, Baby, Zap, ShieldCheck, Flower2, PartyPopper } from "lucide-react";
 
// ─── CONFIG ──────────────────────────────────────────────
const WHATSAPP_NUMBER = "5514998962405";
const CARDAPIO_INFANTIL_URL = "https://cardapio.balabalaobuffet.com.br";
 
// ─── SHARED DATA ─────────────────────────────────────────
const SR = [
  { id: "esfiha-fechada-carne", name: "Esfiha fechada de carne" },
  { id: "esfiha-aberta-carne-catupiry", name: "Esfiha aberta de carne c/ catupiry" },
  { id: "esfiha-escarola", name: "Esfiha de escarola" },
  { id: "risoles-queijo", name: "Risoles de queijo" },
  { id: "trouxinha-frango-calabresa", name: "Trouxinha de frango com calabresa" },
  { id: "croquete-queijo-presunto", name: "Croquete de queijo e presunto" },
  { id: "trouxinha-calabresa", name: "Trouxinha de calabresa" },
  { id: "enroladinho-queijo-presunto", name: "Enroladinho de queijo e presunto" },
  { id: "quibe", name: "Quibe" },
];
const SF = [
  { id: "assado-palmito-gorgonzola", name: "Assado de palmito c/ gorgonzola" },
  { id: "croquete-carne-seca", name: "Croquete de carne seca" },
  { id: "empadinha-palmito", name: "Empadinha de palmito" },
  { id: "folhado-ricota-passas", name: "Folhado de ricota com passas" },
  { id: "assado-tomate-seco-alcaparra", name: "Assado de tomate seco com alcaparra" },
  { id: "trouxinha-ricota-presunto", name: "Trouxinha de ricota com presunto" },
];
const MB = [{ id: "massa-chocolate", name: "Massa chocolate" }, { id: "massa-branca", name: "Massa branca" }];
const RB = [
  { id: "r-brigadeiro", name: "Brigadeiro" }, { id: "r-dl-nozes", name: "Doce de leite com nozes" },
  { id: "r-leite-ninho", name: "Leite Ninho" }, { id: "r-sonho-valsa", name: "Sonho de Valsa" }, { id: "r-ouro-branco", name: "Ouro Branco" },
];
const R_BOMB = { id: "r-bombom", name: "Bombom Crocante" };
const R_TRUF = { id: "r-trufado", name: "Trufado" };
const R_BM = { id: "r-brig-morango", name: "Brigadeiro com morango" };
const R_DLM = { id: "r-dl-morango", name: "Doce de leite com morango" };
const R_ABAC = { id: "r-abacaxi", name: "Abacaxi" };
const DF = [
  { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" }, { id: "brigadeiro-branco", name: "Brigadeiro branco" },
  { id: "brigadeiro-cafe", name: "Brigadeiro de café" }, { id: "bicho-de-pe", name: "Bicho de pé" },
  { id: "beijinho-coco", name: "Beijinho de coco" }, { id: "cajuzinho", name: "Cajuzinho" },
  { id: "brigadeiro-leite-ninho", name: "Brigadeiro Leite Ninho" },
  { id: "brigadeiro-leite-ninho-nutella", name: "Brigadeiro Leite Ninho c/ Nutella" },
  { id: "brigadeiro-doce-leite-nozes", name: "Brigadeiro doce de leite c/ nozes" },
];
const DR = [ // reduzido
  { id: "brigadeiro-tradicional", name: "Brigadeiro tradicional" }, { id: "brigadeiro-branco", name: "Brigadeiro branco" },
  { id: "bicho-de-pe", name: "Bicho de pé" }, { id: "beijinho-coco", name: "Beijinho de coco" },
  { id: "cajuzinho", name: "Cajuzinho" }, { id: "brigadeiro-leite-ninho", name: "Brigadeiro Leite Ninho" },
  { id: "brigadeiro-leite-ninho-nutella", name: "Brigadeiro Leite Ninho c/ Nutella" },
  { id: "brigadeiro-doce-leite-nozes", name: "Brigadeiro doce de leite c/ nozes" },
];
const MP = [{ id: "sofiateli", name: "Sofiateli" }, { id: "rondelli", name: "Rondelli" }, { id: "cannelloni", name: "Cannelloni" }];
const MOL = [{ id: "molho-bechamel", name: "Molho Béchamel" }, { id: "molho-sugo", name: "Molho de tomate ao Sugo" }];
const S5 = [
  { id: "fritas", name: "Fritas" }, { id: "bolinha-queijo", name: "Bolinha de queijo" },
  { id: "coxinha-frango", name: "Coxinha de frango" }, { id: "mini-pizza", name: "Mini pizza" },
  { id: "enroladinho-salsicha", name: "Enroladinho de salsicha" },
];
const S6 = [...S5, { id: "mini-hotdog", name: "Mini hotdog" }];
const BEB = [{ id: "agua", name: "Água com e sem gás" }, { id: "suco-natural", name: "Suco natural" }, { id: "refrigerantes", name: "Refrigerantes" }];
 
// ─── GROUP BUILDERS ──────────────────────────────────────
// These factory functions avoid repeating 50+ lines per package
const gSalgados = (nChoice, nFinos) => ({
  id: "salgados", name: "Salgados", icon: "utensils", sections: [
    { id: "s-fix", name: "6 salgados inclusos", type: "fixed", items: [...S6] },
    { id: "s-choice", name: `Escolha mais ${nChoice} variedades`, type: "choice", required: true,
      rule: { mode: "pick", min: nChoice, max: nChoice }, options: [...SR] },
    { id: "sf-choice", name: `Salgados Finos — escolha ${nFinos}`, type: "choice", required: true,
      rule: { mode: "pick", min: nFinos, max: nFinos }, options: [...SF] },
  ],
});
 
const gBebidas = (...extras) => ({
  id: "bebidas", name: "Bebidas", icon: "glass", sections: [
    { id: "b-fix", name: "Bebidas", type: "fixed", items: [...BEB, ...extras] },
  ],
});
const CERVEJA = { id: "cerveja", name: "Cerveja" };
const ESPUMANTE = { id: "espumante", name: "Espumante" };
 
const gPrato1 = () => ({
  id: "pratos", name: "Pratos", icon: "chef", sections: [
    { id: "p-choice", name: "Prato principal", type: "choice", required: true,
      rule: { mode: "pick_one", min: 1, max: 1 },
      options: [{ id: "sofiateli-molho-branco", name: "Sofiateli com molho branco maçaricado" }, { id: "torta-salgada", name: "Torta salgada" }],
    },
  ],
});
 
const gPrato2 = () => ({
  id: "pratos", name: "Pratos", icon: "chef", sections: [
    { id: "p-fix", name: "2 pratos inclusos", type: "fixed", items: [
      { id: "sofiateli", name: "Sofiateli com molho branco maçaricado" }, { id: "torta-salgada", name: "Torta salgada" },
    ]},
  ],
});
 
const gMenu3 = () => ({
  id: "menu-principal", name: "Menu Principal", icon: "chef", sections: [
    { id: "entrada-fix", name: "Entrada", type: "fixed", items: [{ id: "salada-mix", name: "Salada Mix de Folhas" }] },
    { id: "principal-massa", name: "Prato principal — escolha a massa", type: "choice", required: true,
      rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MP] },
    { id: "principal-molho", name: "Escolha o molho", type: "choice", required: true,
      rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MOL] },
    { id: "sobremesa", name: "Sobremesa empratada", type: "choice", required: true,
      rule: { mode: "pick_one", min: 1, max: 1 },
      options: [{ id: "mousse-chocolate", name: "Torta mousse de chocolate" }, { id: "mousse-limao", name: "Torta mousse de limão" }, { id: "mousse-maracuja", name: "Torta mousse de maracujá" }],
    },
  ],
});
 
const gMenu5 = () => ({
  id: "menu-principal", name: "Menu Principal", icon: "chef", sections: [
    { id: "entrada-fix", name: "Entradas", type: "fixed", items: [{ id: "salada-mix", name: "Salada Mix de Folhas" }, { id: "mini-quiche", name: "Mini quiche" }] },
    { id: "principal-tipo", name: "Prato principal — escolha o tipo", type: "choice", required: true,
      desc: "Massa com molho ou trouxinha de copa lombo",
      rule: { mode: "pick_one", min: 1, max: 1 },
      options: [{ id: "opcao-massa", name: "Massa (escolher tipo e molho)" }, { id: "opcao-copa-lombo", name: "Trouxinha de copa lombo com purê de mandioquinha" }],
    },
    { id: "principal-massa-tipo", name: "Tipo de massa", type: "choice", required: false,
      rule: { mode: "pick_one", min: 1, max: 1 }, conditionalOn: { sectionId: "principal-tipo", value: "opcao-massa" }, options: [...MP] },
    { id: "principal-molho", name: "Escolha o molho", type: "choice", required: false,
      rule: { mode: "pick_one", min: 1, max: 1 }, conditionalOn: { sectionId: "principal-tipo", value: "opcao-massa" }, options: [...MOL] },
    { id: "sobremesa", name: "Sobremesa empratada", type: "choice", required: true,
      rule: { mode: "pick_one", min: 1, max: 1 },
      options: [{ id: "mousse-chocolate", name: "Torta mousse de chocolate" }, { id: "mousse-limao", name: "Torta mousse de limão" }, { id: "mousse-maracuja", name: "Torta mousse de maracujá" }, { id: "tiramissu", name: "Tiramissu" }],
    },
  ],
});
 
const gBolo = (recheios) => ({
  id: "bolo", name: "Bolo", icon: "cake", sections: [
    { id: "bolo-massa", name: "Massa do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: [...MB] },
    { id: "bolo-recheio", name: "Recheio do bolo", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 }, options: recheios },
  ],
});
 
const gDoces = (opts, desc = "Servidos na mesa de doces") => ({
  id: "doces", name: "Doces", icon: "candy", sections: [
    { id: "d-choice", name: "Docinhos", type: "choice", desc, required: true, rule: { mode: "pick", min: 3, max: 3 }, options: opts },
  ],
});
 
const gDocesPersonalizados = () => ({
  id: "doces-personalizados", name: "Doces Personalizados", icon: "palette", sections: [
    { id: "dp-fix", name: "Doces Personalizados", type: "fixed", items: [{ id: "doces-pers", name: "Doces personalizados na mesa de decoração do salão" }] },
  ],
});
 
const gGelato = () => ({
  id: "gelato", name: "Gelato", icon: "icecream", sections: [
    { id: "g-fix", name: "Gelato", type: "fixed", items: [{ id: "gelato-borelli", name: "Gelato Borelli" }] },
  ],
});
 
const gMesaFrios = () => ({
  id: "mesa-frios", name: "Mesa de Pães e Frios", icon: "sandwich", highlight: true, sections: [
    { id: "mf-fix", name: "Mesa de Pães e Frios", type: "fixed", items: [{ id: "mesa-paes-frios", name: "Mesa completa de Pães e Frios" }] },
  ],
});
 
const gCafe1 = () => ({
  id: "mesa-cafe", name: "Mesa do Café", icon: "coffee", sections: [
    { id: "mc-choice", name: "Mesa do Café", type: "choice", required: true, rule: { mode: "pick_one", min: 1, max: 1 },
      options: [{ id: "torta-mousse-limao", name: "Torta mousse de limão" }, { id: "folhado-doce-leite", name: "Folhado de doce de leite" }],
    },
  ],
});
 
const gCafe2 = () => ({
  id: "mesa-cafe", name: "Mesa do Café", icon: "coffee", sections: [
    { id: "mc-choice", name: "Mesa do Café — escolha 2", type: "choice", required: true, rule: { mode: "pick", min: 2, max: 2 },
      options: [
        { id: "torta-mousse-limao", name: "Torta mousse de limão" }, { id: "folhado-doce-leite", name: "Folhado de doce de leite" },
        { id: "torta-banoffee", name: "Torta banoffee" }, { id: "torta-chocolate", name: "Torta de chocolate" },
      ],
    },
  ],
});
 
// ─── PACKAGES DATA ───────────────────────────────────────
// Festas Adultos
const PKG_ADULTOS = [
  { id: "ad-essencial", name: "Essencial", cat: "adultos",
    desc: "13 salgados com finos, cerveja, prato à escolha e docinhos",
    obs: "Qualquer dia", dur: { h: 4, m: 0, tol: 30 },
    tags: ["13 salgados", "Salgados finos", "Cerveja", "Prato à escolha", "4h"],
    groups: [gSalgados(5, 2), gBebidas(CERVEJA), gPrato1(), gBolo([...RB, R_BOMB, R_TRUF]), gDoces(DR), gCafe1()],
  },
  { id: "ad-celebra", name: "Celebra", cat: "adultos",
    desc: "14 salgados, cerveja, 2 pratos, gelato Borelli e mesa de café reforçada",
    obs: "Qualquer dia", dur: { h: 4, m: 0, tol: 30 },
    tags: ["14 salgados", "Salgados finos", "Cerveja", "2 pratos", "Gelato Borelli"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA), gPrato2(), gBolo([...RB, R_BOMB, R_TRUF, R_BM, R_DLM]), gDoces(DF), gGelato(), gCafe2()],
  },
  { id: "ad-exclusive", name: "Exclusive", cat: "adultos",
    desc: "Menu 3 pratos com entrada, prato principal e sobremesa, cerveja e gelato",
    obs: "Qualquer dia", dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Menu 3 pratos", "Cerveja", "Gelato Borelli", "4h30"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA), gMenu3(), gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]), gDoces(DF), gGelato()],
  },
  { id: "ad-premier", name: "Premier", cat: "adultos",
    desc: "A experiência completa: mesa de frios, menu 5 pratos, espumante, gelato e doces personalizados",
    obs: "Qualquer dia", dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Mesa de Frios", "Menu 5 pratos", "Espumante", "Gelato", "Doces personalizados"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA, ESPUMANTE), gMesaFrios(), gMenu5(), gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]), gDoces(DF), gDocesPersonalizados(), gGelato()],
  },
];
 
// Batizados
const PKG_BATIZADOS = [
  { id: "bat-essencial", name: "Batizado Essencial", cat: "batizados",
    desc: "13 salgados com finos, cerveja, prato à escolha e docinhos",
    obs: "Qualquer dia", dur: { h: 4, m: 0, tol: 30 },
    tags: ["13 salgados", "Salgados finos", "Cerveja", "Prato à escolha", "4h"],
    groups: [gSalgados(5, 2), gBebidas(CERVEJA), gPrato1(), gBolo([...RB, R_BOMB, R_TRUF]), gDoces(DR), gCafe1()],
  },
  { id: "bat-encanto", name: "Batizado Encanto", cat: "batizados",
    desc: "14 salgados, cerveja, 2 pratos, gelato Borelli e mesa de café reforçada",
    obs: "Qualquer dia", dur: { h: 4, m: 0, tol: 30 },
    tags: ["14 salgados", "Salgados finos", "Cerveja", "2 pratos", "Gelato Borelli"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA), gPrato2(), gBolo([...RB, R_BOMB, R_TRUF, R_BM, R_DLM]), gDoces(DF), gGelato(), gCafe2()],
  },
  { id: "bat-balabalao", name: "Batizado Bala Balão", cat: "batizados",
    desc: "Menu 3 pratos com entrada e sobremesa, cerveja, espumante e gelato Borelli",
    obs: "Qualquer dia", dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Menu 3 pratos", "Cerveja e espumante", "Gelato Borelli", "4h30"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA, ESPUMANTE), gMenu3(), gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]), gDoces(DF), gGelato()],
  },
];
 
// Mini Weddings
const PKG_WEDDING = [
  { id: "mw-essencial", name: "Mini Wedding Essencial", cat: "wedding",
    desc: "Menu 3 pratos com entrada e sobremesa, cerveja e gelato Borelli",
    obs: "Qualquer dia", dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Menu 3 pratos", "Cerveja", "Gelato Borelli", "4h30"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA), gMenu3(), gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]), gDoces(DF), gGelato()],
  },
  { id: "mw-premier", name: "Mini Wedding Premier", cat: "wedding",
    desc: "Mesa de frios, menu 5 pratos, cerveja e espumante, gelato e doces personalizados",
    obs: "Qualquer dia", dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Mesa de Frios", "Menu 5 pratos", "Espumante", "Gelato", "Doces personalizados"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA, ESPUMANTE), gMesaFrios(), gMenu5(), gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]), gDoces(DF), gDocesPersonalizados(), gGelato()],
  },
  { id: "mw-unique", name: "Mini Wedding Unique", cat: "wedding",
    desc: "Experiência totalmente exclusiva: cardápio autoral, Boom McDonald's, mesa de guloseimas, baby sitter e gerador",
    obs: "Qualquer dia · Até 85 convidados", dur: { h: 5, m: 0, tol: 30 },
    tags: ["Cardápio autoral", "Mesa de Frios", "Boom McDonald's", "Mesa Guloseimas", "Baby Sitter", "Gerador", "Decoração exclusiva"],
    groups: [
      gSalgados(5, 3),
      gBebidas(CERVEJA, ESPUMANTE),
      gMesaFrios(),
      { id: "menu-autoral", name: "Menu Autoral", icon: "chef", highlight: true, sections: [
        { id: "menu-fix", name: "Cardápio definido nos preparativos", type: "fixed", items: [
          { id: "entrada-autoral", name: "Entrada — a definir com o chef nos preparativos" },
          { id: "principal-autoral", name: "Prato principal — a definir com o chef nos preparativos" },
          { id: "sobremesa-autoral", name: "Sobremesa — a definir com o chef nos preparativos" },
        ]},
      ]},
      gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]),
      { id: "doces", name: "Doces", icon: "candy", sections: [
        { id: "d-choice", name: "Docinhos Tradicionais", type: "choice", desc: "Servidos na mesa de doces", required: true, rule: { mode: "pick", min: 3, max: 3 }, options: DF },
      ]},
      gDocesPersonalizados(),
      gGelato(),
      { id: "boom", name: "Boom McDonald's", icon: "utensils", highlight: true, sections: [
        { id: "boom-fix", name: "Boom McDonald's", type: "fixed", items: [{ id: "big-mac", name: "Big Macs servidos no fim da festa" }] },
      ]},
      { id: "guloseimas", name: "Mesa de Guloseimas", icon: "candy", sections: [
        { id: "gul-fix", name: "Mesa de Guloseimas", type: "fixed", items: [
          { id: "balas-fini", name: "Balas Fini" }, { id: "bombons", name: "Bombons" },
          { id: "petit-fours", name: "Petit fours" }, { id: "cafe", name: "Café" },
        ]},
      ]},
      { id: "extras", name: "Exclusividades Unique", icon: "gift", highlight: true, sections: [
        { id: "ex-fix", name: "Inclusos no pacote", type: "fixed", items: [
          { id: "baby-sitter", name: "Baby Sitter para os bebês" },
          { id: "gerador", name: "Gerador de energia" },
          { id: "decoracao", name: "Decoração exclusiva com a decoradora da casa" },
          { id: "reserva-dia", name: "Reserva do salão no dia anterior para preparativos" },
          { id: "acompanhamento", name: "Acompanhamento integral do proprietário" },
        ]},
      ]},
    ],
  },
];
 
// Formaturas
const PKG_FORMATURAS = [
  { id: "fmt-1", name: "Formatura I", cat: "formaturas",
    desc: "13 salgados com finos, cerveja, prato à escolha e docinhos",
    obs: "Qualquer dia", dur: { h: 4, m: 0, tol: 30 },
    tags: ["13 salgados", "Salgados finos", "Cerveja", "Prato à escolha", "4h"],
    groups: [gSalgados(5, 2), gBebidas(CERVEJA), gPrato1(), gBolo([...RB, R_BOMB, R_TRUF]), gDoces(DR), gCafe1()],
  },
  { id: "fmt-2", name: "Formatura II", cat: "formaturas",
    desc: "14 salgados, cerveja, 2 pratos, gelato Borelli e mesa de café reforçada",
    obs: "Qualquer dia", dur: { h: 4, m: 0, tol: 30 },
    tags: ["14 salgados", "Salgados finos", "Cerveja", "2 pratos", "Gelato Borelli"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA), gPrato2(), gBolo([...RB, R_BOMB, R_TRUF, R_BM, R_DLM]), gDoces(DF), gGelato(), gCafe2()],
  },
  { id: "fmt-3", name: "Formatura III", cat: "formaturas",
    desc: "Menu 3 pratos completo com entrada e sobremesa, cerveja e gelato Borelli",
    obs: "Qualquer dia", dur: { h: 4, m: 30, tol: 30 },
    tags: ["14 salgados", "Menu 3 pratos", "Cerveja", "Gelato Borelli", "Cerimônia de diplomas"],
    groups: [gSalgados(5, 3), gBebidas(CERVEJA), gMenu3(), gBolo([...RB, R_TRUF, R_ABAC, R_BM, R_DLM]), gDoces(DF), gGelato()],
  },
];
 
const ALL_PACKAGES = [...PKG_ADULTOS, ...PKG_BATIZADOS, ...PKG_WEDDING, ...PKG_FORMATURAS];
 
// ─── CATEGORY CONFIG ─────────────────────────────────────
const CATS = {
  adultos: {
    name: "Aniversários & Celebrações", icon: Wine, emoji: "🥂",
    shortName: "Festas de Adultos",
    tagline: "Celebre cada década com sofisticação",
    heroDesc: "Nosso espaço e equipe estão preparados para transformar seu aniversário em uma experiência elegante e memorável, com decoração personalizada pelo nosso time e gastronomia autoral do chef.",
    types: ["Aniversários de 40 a 90 anos", "Jantares & almoços especiais", "Confraternizações"],
    fields: ["name", "phone", "email", "date"],
  },
  batizados: {
    name: "Batizados", icon: Droplets, emoji: "🕊️",
    shortName: "Batizados",
    tagline: "Um momento sagrado celebrado com delicadeza",
    heroDesc: "Oferecemos um ambiente intimista com decoração temática de batizado, flores naturais e toda a atenção aos detalhes para que sua família celebre essa bênção com acolhimento e tranquilidade.",
    types: ["Batizados", "Celebrações religiosas"],
    fields: ["name", "phone", "email", "date", "childName"],
    childLabel: "Nome do(a) batizando(a)",
  },
  wedding: {
    name: "Mini Weddings", icon: Heart, emoji: "💍",
    shortName: "Mini Weddings",
    tagline: "Recepções intimistas e sofisticadas",
    heroDesc: "Realizamos almoços e jantares celebrativos para casais que desejam uma recepção intimista e inesquecível. Não realizamos cerimônias com altar — criamos o cenário perfeito para sua celebração pós-cerimônia.",
    heroNotes: [
      "Todos os pacotes incluem gerador de energia para total tranquilidade",
      "Decorações exclusivas e reconhecidas pela excelência e beleza",
      "Nossa equipe experiente cuida das crianças com carinho para que os convidados aproveitem a celebração",
    ],
    thirdPartyNotes: [
      "Serviços como DJ, pista de dança, fotografia e filmagem não estão inclusos no pacote.",
      "A contratação desses fornecedores é de responsabilidade do cliente, com liberdade para escolher os parceiros de sua preferência.",
    ],
    types: ["Mini Weddings", "Recepções de casamento"],
    fields: ["name", "phone", "email", "date", "couple"],
  },
  formaturas: {
    name: "Formaturas", icon: GraduationCap, emoji: "🎓",
    shortName: "Formaturas",
    tagline: "Celebre essa conquista com grandiosidade",
    heroDesc: "Realizamos a cerimônia de entrega dos diplomas e preparamos uma festa completa com decoração personalizada e gastronomia autoral. Cada formatura é única — e merece ser celebrada à altura.",
    types: ["Formaturas escolares", "Formaturas universitárias"],
    fields: ["name", "phone", "email", "date", "school", "classGroup"],
  },
};
 
// ─── UTILS ───────────────────────────────────────────────
const fmtPhone = v => { const d = v.replace(/\D/g, "").slice(0,11); if(d.length<=2) return d; if(d.length<=7) return `(${d.slice(0,2)}) ${d.slice(2)}`; return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`; };
const fmtDur = d => { let s=`${d.h}h`; if(d.m) s+=`${d.m}min`; return s+` + ${d.tol}min tolerância`; };
const choiceSections = pkg => { const r=[]; pkg.groups.forEach(g=>g.sections.forEach(s=>{if(s.type==="choice")r.push(s);})); return r; };
const isComplete = (pkg, sel) => {
  for(const s of choiceSections(pkg)){
    if(s.conditionalOn){ const p=sel[s.conditionalOn.sectionId]||[]; if(!p.includes(s.conditionalOn.value)) continue; }
    if(!s.required&&!s.conditionalOn) continue;
    if((sel[s.id]||[]).length<s.rule.min) return false;
  } return true;
};
 
const buildMsg = (pkg, info, sel, catId) => {
  const cat = CATS[catId];
  let m = `*BALA BALÃO BUFFET*\n${cat.name}\n\n*Contratante*\nNome: ${info.name}\nTelefone: ${info.phone}\nE-mail: ${info.email}\nData: ${info.date ? new Date(info.date+'T12:00:00').toLocaleDateString('pt-BR') : ''}\n`;
  if(catId==="batizados"&&info.childName) m+=`Batizando(a): ${info.childName}\n`;
  if(catId==="wedding"&&info.couple) m+=`Casal: ${info.couple}\n`;
  if(catId==="formaturas"){if(info.school) m+=`Escola: ${info.school}\n`; if(info.classGroup) m+=`Turma: ${info.classGroup}\n`;}
  m+=`\n*Pacote: ${pkg.name}*\nDuração: ${fmtDur(pkg.dur)}\n\n`;
  pkg.groups.forEach(g=>{
    m+=`── ${g.name} ──\n`;
    g.sections.forEach(s=>{
      if(s.type==="fixed"){s.items.forEach(it=>{m+=`- ${it.name}\n`;});}
      else{if(s.conditionalOn){const p=sel[s.conditionalOn.sectionId]||[];if(!p.includes(s.conditionalOn.value))return;}
        const sl=sel[s.id]||[];if(sl.length){m+=`*${s.name}:*\n`;sl.forEach(id=>{const o=s.options.find(x=>x.id===id);if(o)m+=`- ${o.name}\n`;});}
      }
    }); m+=`\n`;
  });
  m+=`───────────────\nEnviado pelo sistema Bala Balão Buffet`;
  return m;
};
 
// ─── THEME ───────────────────────────────────────────────
const T = {
  bg:"#FAFAF7",bgCard:"#FFFFFF",bgHover:"#F5F3EE",
  text:"#2D2926",textSec:"#8A8680",textLight:"#B5B0AA",
  accent:"#B8956A",accentLight:"#D4BC9A",accentBg:"#F8F3ED",
  green:"#7BA88E",greenBg:"#F0F7F2",red:"#C27C6B",redBg:"#FDF3F1",
  border:"#E8E4DF",borderLight:"#F0ECE7",dark:"#2D2926",
};
const IM={utensils:Utensils,glass:GlassWater,candy:Star,cake:Cake,gift:Gift,coffee:Coffee,icecream:Snowflake,chef:ChefHat,sandwich:Sandwich,palette:Palette};
 
// ─── STYLES ─────────────────────────────────────────────
const GS=()=>(<style>{`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif;background:${T.bg};color:${T.text}}
.fd{font-family:'Cormorant Garamond',serif}
@keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
@keyframes fi{from{opacity:0}to{opacity:1}}
@keyframes si{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
@keyframes cp{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
.afu{animation:fu .5s ease-out both}.afi{animation:fi .4s ease-out both}.asi{animation:si .4s ease-out both}.acp{animation:cp .3s ease-out both}
.d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}.d4{animation-delay:.2s}.d5{animation-delay:.25s}.d6{animation-delay:.3s}.d7{animation-delay:.35s}.d8{animation-delay:.4s}
input:focus,select:focus{outline:none;border-color:${T.accent}!important;box-shadow:0 0 0 3px ${T.accentBg}}
::selection{background:${T.accentLight};color:${T.text}}
::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:${T.border};border-radius:3px}
`}</style>);
 
// ─── COMPONENTS ─────────────────────────────────────────
const Btn=({children,onClick,variant="primary",disabled,full,small,icon:Ic})=>{
  const b={fontFamily:"'DM Sans'",fontWeight:500,cursor:disabled?"not-allowed":"pointer",border:"none",borderRadius:12,display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all .2s",width:full?"100%":"auto",opacity:disabled?.4:1,fontSize:small?14:16,padding:small?"10px 20px":"14px 28px"};
  const s={primary:{...b,background:T.accent,color:"#fff"},secondary:{...b,background:"transparent",color:T.accent,border:`1.5px solid ${T.accent}`},ghost:{...b,background:"transparent",color:T.textSec,padding:small?"8px 16px":"12px 20px"}};
  return<button style={s[variant]} onClick={disabled?undefined:onClick} onMouseEnter={e=>{if(!disabled){e.target.style.transform="translateY(-1px)";e.target.style.boxShadow="0 4px 12px rgba(0,0,0,.08)"}}} onMouseLeave={e=>{e.target.style.transform="";e.target.style.boxShadow=""}}>{children}{Ic&&<Ic size={small?14:18}/>}</button>;
};
const Badge=({children,variant="default"})=>{const c={default:{bg:T.accentBg,color:T.accent},green:{bg:T.greenBg,color:T.green}};const v=c[variant]||c.default;return<span style={{display:"inline-flex",alignItems:"center",padding:"4px 12px",borderRadius:20,fontSize:12,fontWeight:600,background:v.bg,color:v.color}}>{children}</span>};
const PI=({current,total})=>(<div style={{display:"flex",gap:4,padding:"16px 0"}}>{Array.from({length:total},(_,i)=>(<div key={i} style={{flex:1,height:3,borderRadius:2,transition:"all .4s",background:i<=current?T.accent:T.border}}/>))}</div>);
const SI=({icon,size=20})=>{const Ic=IM[icon];return Ic?<Ic size={size} strokeWidth={1.5} color={T.accent}/>:<Star size={size} strokeWidth={1.5} color={T.accent}/>};
const Pg=({children,maxW=560})=>(<div className="afi" style={{minHeight:"100vh",background:T.bg,padding:"0 16px 40px"}}><div style={{maxWidth:maxW,margin:"0 auto"}}>{children}</div></div>);
const Hd=({onBack,step,total,title})=>(<div style={{position:"sticky",top:0,zIndex:50,background:T.bg,paddingTop:16,paddingBottom:8}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>{onBack?<button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4,color:T.textSec,fontSize:14,fontFamily:"'DM Sans'"}}><ChevronLeft size={18}/> Voltar</button>:<div/>}{step!==undefined&&<span style={{fontSize:12,color:T.textLight,fontWeight:500}}>Passo {step} de {total}</span>}</div>{step!==undefined&&<PI current={step-1} total={total}/>}{title&&<h1 className="fd" style={{fontSize:28,fontWeight:600,color:T.text,lineHeight:1.2,marginTop:8}}>{title}</h1>}</div>);
const Fd=({label,icon:Ic,value,onChange,type="text",placeholder,error,...r})=>(<div style={{marginBottom:16}}><label style={{display:"block",fontSize:13,fontWeight:500,color:T.textSec,marginBottom:6}}>{label}</label><div style={{position:"relative"}}>{Ic&&<Ic size={16} color={T.textLight} style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)"}}/>}<input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{width:"100%",padding:Ic?"12px 14px 12px 40px":"12px 14px",fontSize:15,border:`1.5px solid ${error?T.red:T.border}`,borderRadius:12,background:T.bgCard,color:T.text,fontFamily:"'DM Sans'",transition:"all .2s"}} {...r}/></div>{error&&<span style={{fontSize:12,color:T.red,marginTop:4,display:"block"}}>{error}</span>}</div>);
 
// ─── LANDING PAGE ────────────────────────────────────────
const Landing=({onNav,onCat})=>{
  const cats=[
    {id:"adultos",emoji:"🥂",title:"Festas de Adultos",sub:"Aniversários, jantares, confraternizações",desc:"Celebre com sofisticação e gastronomia autoral",pkgs:"Essencial · Celebra · Exclusive · Premier"},
    {id:"batizados",emoji:"🕊️",title:"Batizados",sub:"Celebrações religiosas",desc:"Ambiente intimista com decoração temática e flores",pkgs:"Essencial · Encanto · Bala Balão"},
    {id:"wedding",emoji:"💍",title:"Mini Weddings",sub:"Recepções de casamento",desc:"Almoços e jantares celebrativos para casais",pkgs:"Essencial · Premier · Unique"},
    {id:"formaturas",emoji:"🎓",title:"Formaturas",sub:"Conquistas acadêmicas",desc:"Cerimônia de diplomas e festa completa",pkgs:"Formatura I · II · III"},
  ];
  return(<div className="afi" style={{background:T.bg,minHeight:"100vh"}}>
    <div style={{maxWidth:640,margin:"0 auto",padding:"0 16px"}}>
      {/* Brand */}
      <div className="afu" style={{textAlign:"center",paddingTop:36}}>
        <h1 className="fd" style={{fontSize:36,fontWeight:700,color:T.text,lineHeight:1.1}}>Bala Balão</h1>
        <p className="fd" style={{fontSize:16,color:T.textSec,fontStyle:"italic"}}>Buffet · Eventos · Celebrações</p>
        <div style={{width:48,height:1.5,background:T.accent,margin:"14px auto",borderRadius:1}}/>
      </div>
 
      {/* HERO: Festas Infantis */}
      <a href={CARDAPIO_INFANTIL_URL} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
        <div className="afu d2" style={{
          background:`linear-gradient(135deg, #E8C9A0 0%, ${T.accent} 50%, #A07B50 100%)`,
          borderRadius:20,padding:"32px 24px",marginTop:16,position:"relative",overflow:"hidden",cursor:"pointer",transition:"all .25s",
        }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 16px 40px rgba(184,149,106,0.3)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
          <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,background:"radial-gradient(circle at 80% 20%, rgba(255,255,255,0.15), transparent 60%)"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <span style={{fontSize:32}}>🎈</span>
              <div>
                <span style={{fontSize:10,fontWeight:700,letterSpacing:2.5,textTransform:"uppercase",color:"rgba(255,255,255,0.7)"}}>Nossa especialidade</span>
                <span style={{fontSize:10,fontWeight:600,color:"rgba(255,255,255,0.5)",display:"block"}}>há mais de 25 anos</span>
              </div>
            </div>
            <h2 className="fd" style={{fontSize:34,fontWeight:700,color:"#fff",lineHeight:1.15,marginBottom:8}}>Festas Infantis</h2>
            <p style={{fontSize:14,color:"rgba(255,255,255,0.75)",lineHeight:1.6,maxWidth:380,marginBottom:20}}>
              Espaço de 1.200 m², recreação com monitores, brinquedos seguros e cardápios que encantam crianças e adultos. Referência em Botucatu e região.
            </p>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.2)",backdropFilter:"blur(8px)",borderRadius:10,padding:"10px 20px"}}>
              <span style={{fontSize:14,fontWeight:600,color:"#fff"}}>Montar cardápio infantil</span>
              <ArrowRight size={16} color="#fff"/>
            </div>
          </div>
        </div>
      </a>
 
      {/* Section title */}
      <div className="afu d4" style={{textAlign:"center",margin:"32px 0 20px"}}>
        <h2 className="fd" style={{fontSize:24,fontWeight:600,color:T.text}}>Eventos para Adultos</h2>
        <p style={{fontSize:14,color:T.textSec,marginTop:4}}>Aniversários, mini weddings, batizados e formaturas</p>
      </div>
 
      {/* Category cards */}
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {cats.map((c,i)=>(
          <button key={c.id} className={`afu d${Math.min(i+5,8)}`}
            onClick={()=>{onCat(c.id);onNav("catIntro")}}
            style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderRadius:18,padding:"20px",cursor:"pointer",textAlign:"left",transition:"all .25s",fontFamily:"'DM Sans'",display:"flex",alignItems:"center",gap:16}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.06)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
            <div style={{fontSize:32,flexShrink:0,width:48,textAlign:"center"}}>{c.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:700,fontSize:17,color:T.text,marginBottom:2}}>{c.title}</div>
              <div style={{fontSize:13,color:T.textSec,marginBottom:6}}>{c.desc}</div>
              <div style={{fontSize:11,color:T.accent,fontWeight:600}}>{c.pkgs}</div>
            </div>
            <ChevronRight size={18} color={T.textLight} style={{flexShrink:0}}/>
          </button>
        ))}
      </div>
 
      {/* Footer */}
      <div className="afu d8" style={{textAlign:"center",padding:"36px 0 48px"}}>
        <p style={{fontSize:13,color:T.textLight}}>Rua Prudente de Moraes, 894 — Centro, Botucatu/SP</p>
        <p style={{fontSize:12,color:T.textLight,marginTop:4}}>Mais de 25 anos fazendo feliz a sua festa</p>
      </div>
    </div>
  </div>);
};
 
// ─── CATEGORY INTRO PAGE ─────────────────────────────────
const CatIntro=({catId,onNav})=>{
  const cat=CATS[catId];
  const pkgs=ALL_PACKAGES.filter(p=>p.cat===catId);
  const Ic=cat.icon;
  return(<Pg maxW={640}>
    <Hd onBack={()=>onNav("landing")} title={cat.name}/>
    {/* Thematic hero */}
    <div className="afu" style={{
      background:`linear-gradient(135deg, ${T.dark} 0%, #4A3F37 100%)`,
      borderRadius:20,padding:"28px 24px",marginBottom:24,position:"relative",overflow:"hidden",
    }}>
      <div style={{position:"absolute",top:0,left:24,right:24,height:2,background:`linear-gradient(90deg, transparent, ${T.accent}, transparent)`,borderRadius:1}}/>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <span style={{fontSize:28}}>{cat.emoji}</span>
        <div>
          <span style={{fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:T.accentLight}}>{cat.shortName}</span>
        </div>
      </div>
      <h2 className="fd" style={{fontSize:26,fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:10}}>{cat.tagline}</h2>
      <p style={{fontSize:14,color:"rgba(255,255,255,0.65)",lineHeight:1.6}}>{cat.heroDesc}</p>
      {cat.heroNotes&&(
        <div style={{marginTop:16,display:"flex",flexDirection:"column",gap:6}}>
          {cat.heroNotes.map((n,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
              <CheckCircle2 size={14} color={T.accentLight} style={{marginTop:2,flexShrink:0}}/>
              <span style={{fontSize:13,color:"rgba(255,255,255,0.55)",lineHeight:1.5}}>{n}</span>
            </div>
          ))}
        </div>
      )}
    </div>

    {cat.thirdPartyNotes&&(
      <div className="afu d2" style={{background:"#FFF8F1",border:`1px solid ${T.accent}`,borderRadius:14,padding:"16px 18px",marginBottom:20}}>
        <div style={{fontSize:11,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",color:T.accent,marginBottom:8}}>
          Serviços Terceirizados (a cargo do cliente)
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:6}}>
          {cat.thirdPartyNotes.map((n,i)=>(
            <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8}}>
              <ArrowRight size={14} color={T.accent} style={{marginTop:2,flexShrink:0}}/>
              <span style={{fontSize:13,color:T.textSec,lineHeight:1.5}}>{n}</span>
            </div>
          ))}
        </div>
      </div>
    )}
 
    {/* Package cards */}
    <h3 className="fd" style={{fontSize:20,fontWeight:600,color:T.text,marginBottom:16}}>Escolha seu pacote</h3>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {pkgs.map((pkg,i)=>(
        <button key={pkg.id} className={`afu d${Math.min(i+1,6)}`}
          onClick={()=>{onNav("selectPkg",pkg.id)}}
          style={{background:T.bgCard,border:`1.5px solid ${T.border}`,borderRadius:16,padding:"20px",cursor:"pointer",textAlign:"left",transition:"all .2s",fontFamily:"'DM Sans'"}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor=T.accent;e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.06)"}} onMouseLeave={e=>{e.currentTarget.style.borderColor=T.border;e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
          <div style={{fontWeight:600,fontSize:17,color:T.text,marginBottom:4}}>{pkg.name}</div>
          <div style={{fontSize:13,color:T.textSec,marginBottom:8}}>{pkg.desc}</div>
          <div style={{display:"flex",alignItems:"center",gap:12,fontSize:12,color:T.textSec}}>
            <span><Clock size={12} style={{verticalAlign:-1,marginRight:3}}/>{fmtDur(pkg.dur)}</span>
          </div>
        </button>
      ))}
    </div>
  </Pg>);
};
 
// ─── CLIENT INFO ─────────────────────────────────────────
const InfoPage=({info,setInfo,onNav,pkg,catId})=>{
  const [err,setErr]=useState({});
  const cat=CATS[catId];
  const v=()=>{
    const e={};
    if(!info.name||info.name.length<3) e.name="Informe o nome";
    if(!info.phone||info.phone.replace(/\D/g,"").length<10) e.phone="Telefone inválido";
    if(!info.email||!info.email.includes("@")) e.email="E-mail inválido";
    if(!info.date) e.date="Informe a data";
    if(catId==="batizados"&&!info.childName) e.childName="Informe o nome do(a) batizando(a)";
    if(catId==="wedding"&&!info.couple) e.couple="Informe os nomes do casal";
    if(catId==="formaturas"&&!info.school) e.school="Informe a escola";
    if(catId==="formaturas"&&!info.classGroup) e.classGroup="Informe a turma";
    setErr(e); return Object.keys(e).length===0;
  };
  const u=(k,val)=>setInfo(p=>({...p,[k]:val}));
  const today=new Date().toISOString().split("T")[0];
  return(<Pg>
    <Hd onBack={()=>onNav("catIntro")} step={1} total={3} title="Seus dados"/>
    <p style={{color:T.textSec,fontSize:15,marginBottom:24}}>Pacote: <strong style={{color:T.text}}>{pkg.name}</strong></p>
    <div className="afu">
      <Fd label="Nome do contratante" icon={User} value={info.name} placeholder="Maria Silva" onChange={e=>u("name",e.target.value)} error={err.name}/>
      <Fd label="Telefone" icon={Phone} value={info.phone} placeholder="(14) 99999-9999" onChange={e=>u("phone",fmtPhone(e.target.value))} error={err.phone}/>
      <Fd label="E-mail" icon={Mail} value={info.email} placeholder="contato@email.com" type="email" onChange={e=>u("email",e.target.value)} error={err.email}/>
      <Fd label="Data do evento" icon={Calendar} value={info.date} type="date" min={today} onChange={e=>u("date",e.target.value)} error={err.date}/>
      {catId==="batizados"&&<Fd label="Nome do(a) batizando(a)" icon={Baby} value={info.childName||""} placeholder="João Pedro" onChange={e=>u("childName",e.target.value)} error={err.childName}/>}
      {catId==="wedding"&&<Fd label="Nomes do casal" icon={Heart} value={info.couple||""} placeholder="Ana & Carlos" onChange={e=>u("couple",e.target.value)} error={err.couple}/>}
      {catId==="formaturas"&&<><Fd label="Escola / Instituição" icon={School} value={info.school||""} placeholder="Colégio Objetivo" onChange={e=>u("school",e.target.value)} error={err.school}/><Fd label="Turma contratante" icon={Users} value={info.classGroup||""} placeholder="3º ano A — 2026" onChange={e=>u("classGroup",e.target.value)} error={err.classGroup}/></>}
    </div>
    <div style={{paddingTop:8}}><Btn full onClick={()=>{if(v())onNav("menu")}} icon={ArrowRight}>Continuar para o cardápio</Btn></div>
  </Pg>);
};
 
// ─── MENU CHOICES ────────────────────────────────────────
const MenuPage=({pkg,sel,setSel,onNav})=>{
  const toggle=(sid,oid,mode,max)=>{setSel(p=>{const c=p[sid]||[];if(mode==="pick_one")return{...p,[sid]:[oid]};if(c.includes(oid))return{...p,[sid]:c.filter(x=>x!==oid)};if(c.length>=max)return p;return{...p,[sid]:[...c,oid]};});};
  const vis=s=>{if(!s.conditionalOn)return true;return(sel[s.conditionalOn.sectionId]||[]).includes(s.conditionalOn.value);};
  const done=isComplete(pkg,sel);
  return(<Pg maxW={600}>
    <Hd onBack={()=>onNav("info")} step={2} total={3} title="Monte seu cardápio"/>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:24}}>
      <span style={{fontSize:15,fontWeight:600,color:T.text}}>{pkg.name}</span>
      <span style={{color:T.border}}>·</span>
      <span style={{fontSize:13,color:T.textSec}}>{fmtDur(pkg.dur)}</span>
    </div>
    {pkg.groups.map((g,gi)=>(
      <div key={g.id} className={`afu d${Math.min(gi+1,6)}`} style={{marginBottom:28,background:T.bgCard,borderRadius:16,border:`1px solid ${T.border}`,padding:"20px",overflow:"hidden",...(g.highlight?{borderColor:T.accent,boxShadow:`0 0 0 1px ${T.accent}`}:{})}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:T.accentBg,display:"flex",alignItems:"center",justifyContent:"center"}}><SI icon={g.icon} size={18}/></div>
          <h3 className="fd" style={{fontSize:20,fontWeight:600,color:T.text}}>{g.name}</h3>
        </div>
        {g.sections.map(s=>{
          if(!vis(s))return null;
          const sl=sel[s.id]||[];
          if(s.type==="fixed") return(<div key={s.id} style={{marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:600,color:T.textSec,marginBottom:8,textTransform:"uppercase",letterSpacing:.8}}>{s.name}</div>
            {s.items.map((it,ii)=>(<div key={it.id} className={`afu d${Math.min(ii+1,8)}`} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:T.greenBg,borderRadius:10,marginBottom:6}}>
              <CheckCircle2 size={16} color={T.green}/><span style={{fontSize:14,color:T.text}}>{it.name}</span><Badge variant="green">incluso</Badge>
            </div>))}
          </div>);
          const{mode,max}=s.rule;const at=sl.length>=max;
          return(<div key={s.id} style={{marginBottom:12}}>
            <div style={{fontSize:12,fontWeight:600,color:T.textSec,marginBottom:6,textTransform:"uppercase",letterSpacing:.8}}>{s.name}</div>
            {s.desc&&<p style={{fontSize:13,color:T.textSec,marginBottom:8}}>{s.desc}</p>}
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",background:at?T.greenBg:T.accentBg,borderRadius:8,marginBottom:10}}>
              <span style={{fontSize:13,fontWeight:600,color:at?T.green:T.accent}}>{sl.length} de {max}</span>
              <span style={{fontSize:12,color:T.textSec}}>{at?"completo":"selecionados"}</span>
              {at&&<CheckCircle2 size={14} color={T.green}/>}
            </div>
            {s.options.map(o=>{const is=sl.includes(o.id);return(
              <button key={o.id} onClick={()=>toggle(s.id,o.id,mode,max)} disabled={at&&!is}
                style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",width:"100%",background:is?T.accentBg:T.bgCard,border:`1.5px solid ${is?T.accent:T.border}`,borderRadius:10,marginBottom:6,cursor:at&&!is?"not-allowed":"pointer",transition:"all .2s",opacity:at&&!is?.4:1,fontFamily:"'DM Sans'",textAlign:"left"}}>
                <div style={{width:22,height:22,borderRadius:mode==="pick_one"?"50%":6,border:`2px solid ${is?T.accent:T.border}`,display:"flex",alignItems:"center",justifyContent:"center",background:is?T.accent:"transparent",flexShrink:0}}>
                  {is&&<Check size={14} color="#fff" className="acp"/>}
                </div>
                <span style={{fontSize:14,color:T.text,fontWeight:is?500:400}}>{o.name}</span>
              </button>
            );})}
          </div>);
        })}
      </div>
    ))}
    <div style={{position:"sticky",bottom:0,padding:"16px 0",background:T.bg}}>
      <Btn full onClick={()=>onNav("summary")} disabled={!done} icon={ArrowRight}>{done?"Revisar minhas escolhas":"Complete todas as seleções"}</Btn>
    </div>
  </Pg>);
};
 
// ─── SUMMARY ─────────────────────────────────────────────
const SummaryPage=({pkg,info,sel,onNav,catId})=>{
  const cat=CATS[catId];
  const optName=(s,id)=>s.options?.find(o=>o.id===id)?.name||id;
  return(<Pg maxW={600}>
    <Hd onBack={()=>onNav("menu")} step={3} total={3} title="Revise suas escolhas"/>
    <div className="afu" style={{background:T.bgCard,borderRadius:16,border:`1px solid ${T.border}`,padding:"20px",marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
        <h3 className="fd" style={{fontSize:18,fontWeight:600}}>Dados</h3>
        <Btn small variant="ghost" onClick={()=>onNav("info")}>Editar</Btn>
      </div>
      <div style={{fontSize:14,color:T.textSec,lineHeight:1.8}}>
        <div><strong style={{color:T.text}}>{info.name}</strong></div>
        <div>{info.phone} · {info.email}</div>
        <div>Data: {info.date?new Date(info.date+'T12:00:00').toLocaleDateString('pt-BR'):''}</div>
        {catId==="batizados"&&info.childName&&<div>Batizando(a): {info.childName}</div>}
        {catId==="wedding"&&info.couple&&<div>Casal: {info.couple}</div>}
        {catId==="formaturas"&&<div>{info.school} — {info.classGroup}</div>}
      </div>
    </div>
    <div className="afu d1" style={{background:T.accentBg,borderRadius:16,padding:"16px 20px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
      <span style={{fontSize:24}}>{cat.emoji}</span>
      <div><div style={{fontWeight:600,color:T.text}}>{pkg.name}</div><div style={{fontSize:13,color:T.textSec}}>{fmtDur(pkg.dur)}</div></div>
    </div>
    {pkg.groups.map((g,gi)=>(<div key={g.id} className={`afu d${Math.min(gi+2,8)}`} style={{background:T.bgCard,borderRadius:16,border:`1px solid ${T.border}`,padding:"16px 20px",marginBottom:12}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}><SI icon={g.icon} size={16}/><h4 style={{fontSize:14,fontWeight:600,color:T.accent,textTransform:"uppercase",letterSpacing:.5}}>{g.name}</h4></div>
      {g.sections.map(s=>{if(s.conditionalOn){const p=sel[s.conditionalOn.sectionId]||[];if(!p.includes(s.conditionalOn.value))return null;}return(<div key={s.id} style={{marginBottom:8}}>
        {s.type==="fixed"?<div style={{fontSize:14,color:T.textSec}}>{s.items.map((it,i)=><span key={it.id}>{it.name}{i<s.items.length-1?" · ":""}</span>)}</div>
        :<div><div style={{fontSize:12,color:T.textLight,marginBottom:4}}>{s.name}:</div><div style={{fontSize:14,color:T.text}}>{(sel[s.id]||[]).map((id,i,a)=><span key={id} style={{fontWeight:500}}>{optName(s,id)}{i<a.length-1?" · ":""}</span>)}</div></div>}
      </div>);})}
    </div>))}
    <div style={{display:"flex",gap:12,paddingTop:16}}>
      <Btn full variant="secondary" onClick={()=>onNav("menu")}>Editar</Btn>
      <Btn full onClick={()=>onNav("send")} icon={Send}>Enviar</Btn>
    </div>
  </Pg>);
};
 
// ─── SEND & CONFIRM ──────────────────────────────────────
const SendPage=({pkg,info,sel,onNav,catId})=>{
  const msg=buildMsg(pkg,info,sel,catId);
  const wa=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  return(<Pg><Hd onBack={()=>onNav("summary")} title="Enviar escolhas"/>
    <p style={{color:T.textSec,fontSize:15,marginBottom:24,lineHeight:1.6}}>Tudo pronto! Envie suas escolhas para o Bala Balão pelo WhatsApp.</p>
    <div className="afu"><a href={wa} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}}>
      <div style={{background:"#25D366",borderRadius:16,padding:"20px",display:"flex",alignItems:"center",gap:16,cursor:"pointer",transition:"all .2s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 24px rgba(37,211,102,.2)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>
        <MessageCircle size={28} color="#fff"/>
        <div><div style={{fontWeight:600,fontSize:16,color:"#fff"}}>Enviar por WhatsApp</div><div style={{fontSize:13,color:"rgba(255,255,255,.8)"}}>Abre o WhatsApp com a mensagem pronta</div></div>
      </div>
    </a></div>
    <div className="afu d2" style={{marginTop:28}}>
      <h3 className="fd" style={{fontSize:18,fontWeight:600,marginBottom:12}}>Prévia</h3>
      <div style={{background:T.bgCard,borderRadius:16,border:`1px solid ${T.border}`,padding:"16px 20px",fontSize:13,color:T.textSec,whiteSpace:"pre-wrap",lineHeight:1.6,maxHeight:300,overflowY:"auto",fontFamily:"monospace"}}>{msg}</div>
    </div>
    <div style={{textAlign:"center",paddingTop:24}}><Btn variant="ghost" onClick={()=>onNav("confirm")}>Já enviei, concluir →</Btn></div>
  </Pg>);
};
 
const ConfirmPage=({onNav})=>(<Pg>
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",textAlign:"center",gap:24}}>
    <div className="asi" style={{width:80,height:80,borderRadius:"50%",background:T.greenBg,display:"flex",alignItems:"center",justifyContent:"center"}}><CheckCircle2 size={40} color={T.green}/></div>
    <div className="afu d2"><h1 className="fd" style={{fontSize:32,fontWeight:700,color:T.text,marginBottom:8}}>Tudo certo!</h1><p style={{fontSize:15,color:T.textSec,lineHeight:1.6,maxWidth:340,margin:"0 auto"}}>Suas escolhas foram organizadas e enviadas. Entraremos em contato para confirmar tudo.</p></div>
    <div className="afu d4" style={{width:48,height:1.5,background:T.accent,borderRadius:1}}/>
    <div className="afu d5"><p style={{fontSize:14,color:T.textSec,marginBottom:20}}>Obrigado por escolher o Bala Balão!</p><Btn variant="secondary" onClick={()=>onNav("landing")}>Voltar ao início</Btn></div>
  </div>
</Pg>);
 
// ─── MAIN APP ────────────────────────────────────────────
export default function App(){
  const[page,setPage]=useState("landing");
  const[catId,setCatId]=useState(null);
  const[pkgId,setPkgId]=useState(null);
  const[info,setInfo]=useState({name:"",phone:"",email:"",date:"",childName:"",couple:"",school:"",classGroup:""});
  const[sel,setSel]=useState({});
  const pkg=ALL_PACKAGES.find(p=>p.id===pkgId);
  const scroll=()=>window.scrollTo({top:0,behavior:"smooth"});
 
  const nav=(p,extra)=>{
    if(p==="landing"){setCatId(null);setPkgId(null);setInfo({name:"",phone:"",email:"",date:"",childName:"",couple:"",school:"",classGroup:""});setSel({});}
    if(p==="catIntro"){setPkgId(null);setSel({});}
    if(p==="selectPkg"){setPkgId(extra);setSel({});setPage("info");scroll();return;}
    setPage(p);scroll();
  };
 
  return(<div><GS/>
    {page==="landing"&&<Landing onNav={nav} onCat={setCatId}/>}
    {page==="catIntro"&&catId&&<CatIntro catId={catId} onNav={nav}/>}
    {page==="info"&&pkg&&<InfoPage info={info} setInfo={setInfo} onNav={nav} pkg={pkg} catId={catId}/>}
    {page==="menu"&&pkg&&<MenuPage pkg={pkg} sel={sel} setSel={setSel} onNav={nav}/>}
    {page==="summary"&&pkg&&<SummaryPage pkg={pkg} info={info} sel={sel} onNav={nav} catId={catId}/>}
    {page==="send"&&pkg&&<SendPage pkg={pkg} info={info} sel={sel} onNav={nav} catId={catId}/>}
    {page==="confirm"&&<ConfirmPage onNav={nav}/>}
  </div>);
}
 
