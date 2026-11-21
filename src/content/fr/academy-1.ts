import type { ConceptText, DeepText } from "@/lib/academy/localized";

/** Traduction française des leçons « Par où commencer » (1 à 4). Mêmes faits et même structure que la version anglaise. */

export const TEXT_1: Record<string, ConceptText> = {
  "proof-of-work": {
    title: "Proof of Work",
    summary: "Un mécanisme de consensus où les mineurs dépensent de la puissance de calcul pour proposer des blocs, ce qui rend la réécriture de l'historique coûteuse.",
    body: [
      "Avec la preuve de travail (Proof of Work, PoW), les mineurs calculent sans relâche le hash de blocs candidats jusqu'à en trouver un dont le hash passe sous une cible fixée par le réseau. Trouver ce hash coûte cher ; le vérifier ne coûte presque rien. La chaîne qui a accumulé le plus de travail fait foi.",
      "La sécurité repose sur l'économie : réécrire l'historique récent exigerait de dépenser plus que toute la puissance de calcul honnête du réseau. Les mineurs sont rémunérés par des pièces nouvellement émises (la récompense de bloc, ou subsidy) et par les frais de transaction.",
      "Les contreparties sont la consommation d'énergie, un matériel spécialisé (les ASIC) et une tendance des mineurs à se regrouper en pools, ce qui concentre la production de blocs entre quelques opérateurs.",
    ],
    keyTakeaways: ["La sécurité se paie en énergie et en matériel", "La chaîne qui a le plus de travail l'emporte", "Les pools de minage concentrent la production de blocs"],
  },
  "proof-of-stake": {
    title: "Proof of Stake",
    summary: "Les validateurs immobilisent (stakent) le token du réseau en garantie pour proposer et attester des blocs, et peuvent le perdre s'ils trichent.",
    body: [
      "Avec la preuve d'enjeu (Proof of Stake, PoS), le droit de produire des blocs dépend du nombre de tokens qu'un validateur a immobilisés. Un comportement honnête est récompensé par des tokens nouvellement émis et des frais ; une faute prouvable (comme signer deux blocs contradictoires) peut être punie par la destruction d'une partie de la mise, le slashing.",
      "Le PoS remplace l'énergie dépensée par du capital exposé. Il permet une finalité plus rapide et consomme moins de ressources, mais soulève de nouvelles questions : à quel point la mise est-elle concentrée, qui contrôle la mise déléguée, et comment le token a-t-il été distribué au départ ?",
      "Pour analyser un réseau PoS, regardez la part de l'offre stakée, la concentration de la mise entre entités (plateformes d'échange, protocoles de staking liquide), le rendement réel après inflation, et si le slashing existe vraiment.",
    ],
    keyTakeaways: ["Le capital exposé remplace l'énergie", "L'émission récompense les stakers et dilue les autres", "La concentration de la mise est un indicateur clé de décentralisation"],
  },
  "smart-contracts": {
    title: "Smart contracts",
    summary: "Des programmes déployés sur une blockchain, qui s'exécutent de façon déterministe et peuvent détenir et déplacer des actifs.",
    body: [
      "Un smart contract est du code stocké on-chain que tout le monde peut appeler. Chaque nœud l'exécute de la même façon, si bien que son résultat est validé par tout le réseau. Un contrat peut détenir des tokens, appliquer des règles et appeler d'autres contrats.",
      "Comme les contrats peuvent s'appeler sans autorisation, les applications s'assemblent comme des briques : un protocole de prêt peut accepter un token émis par un autre protocole, qui lui-même utilise l'oracle de prix d'un troisième. Cette composabilité est une source d'innovation et de contagion.",
      "Une fois déployé, le code est souvent immuable, ou modifiable seulement par la gouvernance ou des clés d'administration. Les audits réduisent le risque de bug, sans jamais l'éliminer.",
    ],
    keyTakeaways: ["Du code qui détient et déplace des actifs", "La composabilité crée à la fois innovation et contagion", "Les clés de mise à jour sont une hypothèse de confiance"],
  },
  "gas-fees": {
    title: "Gas et frais de transaction",
    summary: "Le prix que les utilisateurs paient pour l'espace de bloc, la ressource rare du réseau.",
    body: [
      "Chaque transaction consomme du calcul et du stockage, mesurés en unités (le gas sur Ethereum, les compute units sur Solana). Les utilisateurs paient des frais pour que leur transaction soit incluse, en général dans le token natif du réseau.",
      "Les frais dépendent de l'offre et de la demande d'espace de bloc. Beaucoup de réseaux les divisent en une part de base (parfois brûlée) et un pourboire de priorité versé au producteur du bloc.",
      "Pour un analyste, le total des frais payés par les utilisateurs est l'une des mesures les plus directes de la demande pour un réseau, mais il faut le comparer à l'émission versée aux validateurs pour juger de sa soutenabilité économique.",
    ],
    keyTakeaways: ["Les frais mesurent la demande d'espace de bloc", "Les frais de base peuvent être brûlés ; les pourboires vont aux producteurs", "Comparez les frais à l'émission"],
  },
};

export const DEEP_1: Record<string, DeepText> = {
  "proof-of-work": {
    minute:
      "La preuve de travail sécurise une blockchain en rendant la production de blocs coûteuse. Les mineurs rivalisent pour trouver un hash inférieur à une cible ; le gagnant ajoute le bloc suivant et touche la récompense de bloc plus les frais. Réécrire l'historique reviendrait à refaire ce travail plus vite que tous les autres réunis.",
    steps: [
      { title: "Rassembler les transactions", text: "Un mineur regroupe des transactions en attente dans un bloc candidat qui pointe vers le hash du bloc précédent, ce qui enchaîne l'historique." },
      {
        title: "Chercher un hash valide",
        text: "Le mineur modifie un petit champ (le nonce) et recalcule le hash de l'en-tête du bloc encore et encore (double SHA-256 sur Bitcoin) jusqu'à passer sous la cible du réseau. Il n'existe aucun raccourci : c'est de l'essai-erreur pur.",
      },
      { title: "Diffuser et vérifier", text: "Le premier bloc valide est diffusé. Tous les autres nœuds vérifient le hash et les transactions presque instantanément : produire un bloc coûte cher, le vérifier ne coûte rien." },
      { title: "Suivre le plus de travail", text: "Les nœuds construisent sur la chaîne qui a accumulé le plus de travail. Chaque nouveau bloc ajouté rend les précédents plus difficiles à annuler, d'où les plusieurs confirmations attendues par les plateformes d'échange." },
      { title: "Ajuster la difficulté", text: "Tous les 2 016 blocs (environ deux semaines), Bitcoin recalibre la cible pour que les blocs continuent d'arriver à peu près toutes les dix minutes, quelle que soit la puissance de calcul totale." },
    ],
    visualCaption: "La boucle de minage : les mineurs répètent la recherche de hash jusqu'à ce que l'un d'eux trouve un bloc valide, puis tout le monde passe au suivant.",
    example: {
      title: "Bitcoin : une sécurité payée par la récompense de bloc, puis par les frais",
      paragraphs: [
        "Bitcoin est le réseau de référence de la preuve de travail. Les mineurs touchent la récompense de bloc, 3,125 BTC par bloc depuis le halving d'avril 2024, plus les frais des transactions qu'ils incluent. Ensemble, elles forment le budget de sécurité : ce qu'un attaquant devrait dépenser de plus pour l'emporter.",
        "Comme la récompense est divisée par deux tous les 210 000 blocs, le dossier Sensitor considère une question comme ouverte : la demande de frais augmentera-t-elle assez pour financer la sécurité du réseau quand l'émission nouvelle deviendra faible ?",
      ],
    },
    metrics: [
      { label: "Hash rate", read: "La puissance de calcul totale qui sécurise le réseau. Un hash rate élevé et stable rend une attaque plus coûteuse ; des chutes brutales peuvent suivre une baisse du prix ou des fermetures régionales." },
      { label: "Difficulté", read: "Suit le hash rate à chaque ajustement. Une difficulté en hausse signifie plus de concurrence pour les mêmes récompenses." },
      { label: "Part des frais dans les revenus des mineurs", read: "La part des revenus des mineurs qui vient des frais plutôt que des pièces nouvelles. Elle montre à quel point le réseau est prêt pour les prochains halvings." },
      { label: "Concentration des pools de minage", read: "La part des blocs récents trouvés par les plus gros pools. Les pools choisissent quelles transactions entrent dans les blocs : la concentration compte, même si les mineurs peuvent changer de pool." },
    ],
    misconceptions: [
      { myth: "Les mineurs résolvent des problèmes mathématiques utiles.", reality: "L'énigme est volontairement inutile : une recherche en force brute dont le seul but est de rendre la production de blocs coûteuse et facile à vérifier." },
      { myth: "Plus d'énergie, c'est plus de transactions.", reality: "La puissance de calcul sécurise la chaîne mais n'augmente pas sa capacité. La taille et l'intervalle des blocs fixent le nombre de transactions possibles." },
      {
        myth: "Qui contrôle 51 % de la puissance de calcul peut voler n'importe quelle pièce.",
        reality: "Une majorité peut censurer ou réordonner des transactions récentes et dépenser deux fois ses propres pièces. Elle ne peut pas signer de transactions pour des clés qu'elle ne détient pas, ni créer des pièces hors des règles.",
      },
    ],
    risks: [
      "La concentration de la puissance de calcul entre quelques pools, fabricants ou régions.",
      "Un budget de sécurité qui fond si les frais ne remplacent pas la récompense réduite par les halvings.",
      "La consommation d'énergie et la pression réglementaire qu'elle attire sur le minage.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qui rend un bloc en preuve de travail difficile à produire mais facile à vérifier ?",
        options: [
          "Trouver un hash sous la cible demande de nombreux essais, le vérifier ne demande qu'un seul calcul",
          "Les validateurs votent sur chaque bloc avant qu'il soit accepté",
          "Chaque bloc est chiffré avec la clé privée du mineur",
          "Un serveur central approuve les blocs valides",
        ],
        explanation: "Produire un bloc est une loterie faite d'innombrables essais de hash ; n'importe qui peut vérifier le hash gagnant en un seul calcul.",
      },
      {
        question: "Pourquoi Bitcoin ajuste-t-il sa difficulté tous les 2 016 blocs ?",
        options: ["Pour augmenter la récompense de bloc", "Pour garder l'intervalle moyen entre blocs proche de dix minutes", "Pour baisser les frais de transaction", "Pour modifier le plafond de 21 millions"],
        explanation: "L'ajustement compense les variations de la puissance de calcul totale pour que les blocs continuent d'arriver environ toutes les dix minutes.",
      },
      {
        question: "Que peut faire un attaquant qui détient la majorité de la puissance de calcul ?",
        options: ["Voler les pièces de n'importe quelle adresse", "Créer des pièces au-delà du plafond d'offre", "Dépenser deux fois ses propres pièces en réorganisant les blocs récents", "Changer les clés privées des autres utilisateurs"],
        explanation: "Une majorité de la puissance de calcul permet de réécrire l'historique récent, par exemple pour une double dépense, mais pas de casser les signatures ni les règles d'offre.",
      },
    ],
  },

  "proof-of-stake": {
    minute:
      "Avec la preuve d'enjeu, les validateurs immobilisent le token du réseau en garantie pour proposer et confirmer des blocs. Le travail honnête rapporte des récompenses ; une faute prouvable est punie par la destruction d'une partie de la mise (slashing). La sécurité vient du capital exposé et non de l'énergie dépensée.",
    steps: [
      { title: "Déposer une garantie", text: "Un validateur dépose des tokens dans le protocole. Sur Ethereum, activer un validateur demande au moins 32 ETH." },
      { title: "Être sélectionné", text: "Pour chaque slot (12 secondes sur Ethereum), le protocole tire au sort de façon pseudo-aléatoire un proposeur de bloc et désigne d'autres validateurs pour voter, ou attester, sur la tête de la chaîne." },
      { title: "Proposer et attester", text: "Le proposeur construit un bloc ; les attestations des autres validateurs lui donnent du poids, et le réseau converge vers une seule chaîne." },
      {
        title: "Atteindre la finalité",
        text: "Quand des validateurs détenant les deux tiers de la mise votent pour les mêmes checkpoints (des epochs de 32 slots), ces blocs sont finalisés. Les annuler exigerait le slashing d'au moins un tiers de toute la mise.",
      },
      { title: "Récompenser ou pénaliser", text: "Les validateurs reçoivent l'émission nouvelle et des frais pour leurs tâches accomplies à temps, perdent de petites sommes quand ils sont hors ligne, et sont slashés pour des attaques prouvables comme la signature de deux blocs contradictoires." },
    ],
    visualCaption: "Le cycle d'un validateur : immobiliser une mise, être sélectionné, proposer ou attester, puis être récompensé ou pénalisé.",
    example: {
      title: "Ethereum : qui contrôle la mise ?",
      paragraphs: [
        "Ethereum est passé de la preuve de travail à la preuve d'enjeu avec le Merge, en septembre 2022. Sa sécurité dépend désormais de la quantité d'ETH stakée et de qui l'opère.",
        "Les dossiers Ethereum et Lido suivent une question récurrente : les protocoles de staking liquide et les plateformes d'échange regroupent de grandes parts de la mise. Même avec de nombreux opérateurs de nœuds indépendants derrière eux, cette concentration donne à quelques entités un poids démesuré dans le consensus.",
      ],
    },
    metrics: [
      { label: "Part de l'offre stakée", read: "Une part plus élevée augmente le coût d'une attaque, mais immobilise de la liquidité et concentre les récompenses." },
      {
        label: "Concentration de la mise par entité",
        read: "La part contrôlée par les plus gros fournisseurs de staking. Surveillez les seuils : un tiers de la mise peut bloquer la finalité, les deux tiers pourraient finaliser des blocs seuls.",
      },
      { label: "Rendement réel", read: "La récompense de staking moins la croissance de l'offre. Si l'émission nouvelle dilue tout le monde à un rythme comparable, un rendement nominal compense surtout la dilution." },
      { label: "Diversité des clients", read: "La part des validateurs qui utilisent chaque logiciel client. Un bug dans un client utilisé par une large majorité pourrait provoquer des pénalités massives." },
    ],
    misconceptions: [
      { myth: "Le rendement du staking, c'est de l'argent gratuit.", reality: "Les récompenses sont en grande partie de l'émission nouvelle : ceux qui ne stakent pas sont dilués, et les stakers suivent à peu près. Ce qui compte, c'est le rendement après croissance de l'offre." },
      {
        myth: "En preuve d'enjeu, les plus riches décident des règles.",
        reality: "La mise achète de l'influence sur la production de blocs et la finalité, pas sur les règles du protocole, que les opérateurs de nœuds et les utilisateurs doivent toujours choisir d'appliquer. La concentration reste un vrai risque, mesuré séparément.",
      },
      { myth: "Les validateurs sont slashés en permanence.", reality: "Le slashing est rare et vise des attaques prouvables. Une simple indisponibilité ne coûte que de petites pénalités, à peu près égales aux récompenses manquées." },
    ],
    risks: [
      "La concentration de la mise dans quelques protocoles de staking liquide ou plateformes d'échange.",
      "Des pénalités corrélées quand de nombreux validateurs partagent un même opérateur, fournisseur cloud ou client.",
      "Un traitement juridique et fiscal incertain des récompenses de staking dans plusieurs juridictions.",
    ],
    quiz: [
      {
        question: "Qu'est-ce qui remplace l'énergie dépensée comme coût de la sécurité en preuve d'enjeu ?",
        options: ["Les frais de transaction payés par les utilisateurs", "Du capital immobilisé en garantie, qui peut être slashé", "Le nombre de nœuds du réseau", "Du matériel de minage spécialisé"],
        explanation: "Les validateurs exposent du capital : une faute peut être punie par la destruction d'une partie de leur mise.",
      },
      {
        question: "Sur Ethereum, quelle part de la mise doit voter pour un checkpoint afin de le finaliser ?",
        options: ["La moitié", "Un tiers", "Les deux tiers", "Tous les validateurs"],
        explanation: "La finalité exige une super-majorité des deux tiers de l'ETH staké, c'est pourquoi un tiers de la mise est le seuil capable de bloquer la finalité.",
      },
      {
        question: "Pourquoi un rendement de staking élevé n'est-il pas automatiquement un gain ?",
        options: [
          "Parce qu'une partie ne fait que compenser la dilution due à l'émission nouvelle",
          "Parce que les récompenses sont versées dans un autre token",
          "Parce que les récompenses de staking sont toujours imposées à 100 %",
          "Parce que les validateurs doivent rembourser les récompenses au bout d'un an",
        ],
        explanation: "Quand les récompenses viennent de l'émission nouvelle, les détenteurs qui ne stakent pas sont dilués ; seul le rendement au-delà de la croissance de l'offre est un vrai gain.",
      },
    ],
  },

  "smart-contracts": {
    minute:
      "Un smart contract est un programme stocké sur une blockchain. Tout le monde peut l'appeler, chaque nœud l'exécute de la même façon, et il peut détenir et déplacer des actifs de lui-même. Comme les contrats peuvent s'appeler les uns les autres, les applications s'empilent comme des briques, ce qui propage à la fois l'innovation et le risque.",
    steps: [
      { title: "Écrire et déployer", text: "Les développeurs écrivent du code (souvent en Solidity, pour l'Ethereum Virtual Machine) et déploient le bytecode compilé à une adresse. Le déploiement est lui-même une transaction." },
      { title: "Appeler une fonction", text: "Les utilisateurs envoient des transactions qui appellent les fonctions du contrat, en payant du gas pour le calcul et le stockage consommés." },
      { title: "Exécuter de façon déterministe", text: "Chaque nœud exécute le même code avec les mêmes entrées et arrive au même nouvel état : le résultat est validé par tout le réseau." },
      { title: "Composer", text: "Un contrat peut en appeler d'autres dans la même transaction : un échange, un dépôt et un emprunt peuvent se faire ensemble, et si une étape échoue, toute la transaction est annulée." },
      { title: "Mettre à jour, ou non", text: "Le code d'une adresse ne peut pas être modifié, mais beaucoup de protocoles utilisent des contrats proxy qui permettent à une clé d'administration ou à un vote de gouvernance de diriger les utilisateurs vers un nouveau code." },
    ],
    visualCaption: "La composabilité : une seule transaction d'utilisateur peut traverser plusieurs contrats, ici un marché de prêt qui lit un oracle de prix.",
    example: {
      title: "Aave : un marché de prêt construit à partir d'autres contrats",
      paragraphs: [
        "Aave est un ensemble de smart contracts qui reçoivent des dépôts et accordent des prêts surcollatéralisés, sans entreprise au milieu. Pour décider quand un prêt doit être liquidé, il lit les prix des actifs dans des contrats d'oracle, les flux de prix Chainlink sur la plupart des marchés.",
        "Le dossier Aave en fait une dépendance externe importante : un prix erroné ou un bug dans un contrat peut se propager à tous les protocoles construits au-dessus. Le Knowledge Graph cartographie ces liens entre projets.",
      ],
    },
    metrics: [
      { label: "Audits et bug bounty", read: "Qui a audité le code, quand, et quel est le montant de la prime offerte pour la découverte d'un bug critique." },
      { label: "Contrôle des mises à jour", read: "Qui peut modifier le code (clé unique, multisig, timelock, vote de DAO) et de combien de temps les utilisateurs disposent pour sortir avant qu'un changement s'applique." },
      { label: "Ancienneté et valeur exposée", read: "Un code qui détient de gros montants depuis des années sans incident est éprouvé ; un code récent ne l'est pas, quoi qu'en disent ses audits." },
      { label: "Dépendances", read: "Les oracles, bridges et autres protocoles sur lesquels le contrat s'appuie. Chacun ajoute une façon d'échouer." },
    ],
    misconceptions: [
      { myth: "Un smart contract est un contrat juridique.", reality: "C'est un programme. Il fait exactement ce que dit son code, même quand cela diffère de l'intention de ses auteurs, et son statut juridique dépend du contexte." },
      { myth: "Audité veut dire sûr.", reality: "Les audits réduisent le risque mais ont déjà laissé passer des bugs critiques. Ils portent sur une version du code à un moment donné." },
      { myth: "Immuable veut dire que personne ne peut rien changer.", reality: "Beaucoup de protocoles sont modifiables via des clés d'administration ou la gouvernance. Ce contrôle est une hypothèse de confiance à vérifier." },
    ],
    risks: [
      "Des bugs de code qui permettent à des attaquants de vider les fonds.",
      "Des clés d'administration compromises ou mal utilisées sur des contrats modifiables.",
      "La manipulation d'oracles de prix et les défaillances de dépendances, propagées par la composabilité.",
    ],
    quiz: [
      {
        question: "Que signifie l'exécution déterministe pour un smart contract ?",
        options: [
          "Chaque nœud qui l'exécute avec les mêmes entrées obtient le même résultat",
          "Le contrat ne tourne que sur le serveur du développeur",
          "Le résultat est aléatoire pour empêcher les manipulations",
          "Seuls les validateurs peuvent appeler le contrat",
        ],
        explanation: "Le déterminisme permet à des milliers de nœuds de s'accorder sur le résultat d'un contrat sans se faire confiance.",
      },
      {
        question: "Qu'est-ce que la composabilité ?",
        options: ["Compresser le code d'un contrat pour économiser du gas", "Des contrats qui s'appellent pour que les applications puissent se combiner", "Diviser un token en unités plus petites", "Exécuter le même contrat sur deux chaînes"],
        explanation: "La composabilité permet aux protocoles de se réutiliser comme des briques, dans la même transaction.",
      },
      {
        question: "Un protocole est modifiable via un multisig 3 sur 5. Qu'est-ce que cela implique ?",
        options: ["Le code ne peut jamais changer", "N'importe quel utilisateur peut proposer un nouveau code", "Trois détenteurs de clés sur cinq suffisent pour modifier le code", "Seul un tribunal peut modifier le code"],
        explanation: "Un multisig 3 sur 5 signifie que trois signatures sur cinq clés suffisent pour approuver une mise à jour.",
      },
    ],
  },

  "gas-fees": {
    minute:
      "Chaque opération sur une blockchain consomme des ressources, mesurées en gas. Les frais valent gas utilisé × prix du gas. Sur Ethereum, depuis l'EIP-1559, ce prix a deux parties : des frais de base fixés par le protocole et brûlés, et un pourboire facultatif versé au validateur.",
    steps: [
      { title: "Mesurer le travail", text: "Chaque opération a un coût en gas fixe. Un simple transfert d'ETH consomme 21 000 gas ; un échange ou un prêt beaucoup plus, car il exécute davantage de code et touche davantage de stockage." },
      {
        title: "Fixer les frais de base",
        text: "Le protocole fixe des frais de base par unité de gas pour chaque bloc. Ils augmentent quand le bloc précédent était rempli à plus de moitié et baissent dans le cas contraire, de 12,5 % au plus par bloc.",
      },
      { title: "Ajouter un pourboire", text: "Les utilisateurs ajoutent des frais de priorité (le pourboire, ou tip) pour être inclus plus vite. Ils vont au validateur qui propose le bloc." },
      { title: "Brûler et payer", text: "Les frais de base multipliés par le gas utilisé sont brûlés, c'est-à-dire retirés de l'offre. Le pourboire est versé au validateur. Le gas réservé mais non utilisé n'est pas facturé." },
      {
        title: "Les rollups paient leurs données",
        text: "Les transactions de layer 2 paient aussi pour publier leurs données sur Ethereum. Depuis l'EIP-4844 (mars 2024), ces données vont surtout dans des blobs moins chers, qui ont leur propre marché de frais.",
      },
    ],
    visualCaption: "Essayez : modifiez le gas utilisé, les frais de base et le pourboire pour voir les frais et la part qui est brûlée. Valeurs d'exemple, pas des données réelles du réseau.",
    example: {
      title: "Ethereum : frais, burn et offre",
      paragraphs: [
        "Comme les frais de base sont brûlés, l'offre nette d'Ethereum dépend de l'activité : l'émission versée aux validateurs ajoute de l'ETH, les frais brûlés en retirent. En période chargée, le burn peut dépasser l'émission ; en période calme, l'offre augmente.",
        "Le dossier signale un changement structurel : depuis que les rollups ont déplacé leurs données vers des blobs peu coûteux, moins de frais sont brûlés sur le réseau principal. Le retour de la captation de valeur de l'ETH dépend de la demande pour la couche de base et pour l'espace des blobs.",
      ],
    },
    metrics: [
      { label: "Frais de base (gwei)", read: "Le prix de l'espace de bloc fixé par le protocole. C'est l'indicateur le plus direct de la congestion." },
      { label: "Burn face à l'émission", read: "Indique si l'offre nette augmente ou diminue sur une période. Relie l'usage du réseau à l'offre du token." },
      { label: "Frais par couche", read: "Ce que les utilisateurs paient sur Ethereum comparé aux rollups. Montre où l'activité a réellement lieu." },
      { label: "Usage et frais des blobs", read: "La demande des rollups pour de l'espace de données. Des blobs durablement pleins feraient monter leurs frais." },
    ],
    misconceptions: [
      { myth: "Le gas est un token.", reality: "Le gas est une unité de travail de calcul. Les frais sont payés dans le token du réseau, l'ETH sur Ethereum." },
      { myth: "Une transaction échouée ne coûte rien.", reality: "Une transaction annulée paie quand même le gas consommé jusqu'au point d'échec." },
      { myth: "Des frais élevés veulent dire que le réseau est cassé.", reality: "Les frais rationnent un espace de bloc rare. Des frais élevés signalent une demande supérieure à la capacité, que les rollups et les blobs sont conçus pour absorber." },
    ],
    risks: [
      "Des pics de frais qui excluent les utilisateurs ordinaires en période de congestion.",
      "Des coûts de rollup qui dépendent des frais de données d'Ethereum.",
      "L'extraction de valeur par les constructeurs de blocs (MEV), en plus des frais visibles.",
    ],
    quiz: [
      {
        question: "Avec l'EIP-1559, que deviennent les frais de base ?",
        options: ["Ils vont au validateur", "Ils sont brûlés", "Ils sont envoyés à l'Ethereum Foundation", "Ils sont remboursés après le bloc"],
        explanation: "Les frais de base sont détruits, c'est pourquoi l'offre nette d'Ethereum dépend de l'activité.",
      },
      {
        question: "Un transfert consomme 21 000 gas, avec des frais de base de 20 gwei et un pourboire de 2 gwei. Quel est le total des frais ?",
        options: ["0,000462 ETH", "0,00042 ETH", "0,0462 ETH", "0,000021 ETH"],
        explanation: "21 000 × 22 gwei = 462 000 gwei = 0,000462 ETH, dont 0,00042 ETH brûlés et 0,000042 ETH versés au validateur.",
      },
      {
        question: "Qu'a introduit l'EIP-4844 ?",
        options: ["Un plafond fixe sur l'offre d'ETH", "Les blobs, un espace de données moins cher pour les rollups", "Des transferts sans frais", "Un second token natif pour le gas"],
        explanation: "Les transactions porteuses de blobs donnent aux rollups un espace dédié et moins cher pour publier leurs données.",
      },
    ],
  },
};
