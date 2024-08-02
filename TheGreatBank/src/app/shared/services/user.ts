export interface User {
  id: string;
  fechaDato: Date; // Date d'enregistrement (la table est partitionnée pour cette colonne)
  empIndex: string; // index d'employé : A actif, B ex-employé, F filiale, N non employé, P passif
  residence: string; // pays de résidence du client
  sex: string; // sexe du client
  age: number; // âge du client
  firstDate: Date; // date à laquelle le client est devenu le premier titulaire d'un contrat à la banque
  newCust: boolean; // index de nouveau client, 1 si le client s'est inscrit au cours des 6 derniers mois
  seniority: number; // ancienneté du client en mois
  isPrimary: number; // 1 (Premier/Principal), 99 (Client principal pendant le mois mais pas à la fin du mois)
  lastPrimaryDate: Date; // dernière date en tant que client principal (s'il ne l'est pas à la fin du mois)
  custType: string; // type de client au début du mois : 1 (Premier/Principal client), 2 (co-propriétaire), P (Potentiel)
  custRelType: string; // type de relation du client au début du mois : A (actif), I (inactif), P (ancien client)
  residenceIndex: boolean; // indiquant si le client réside dans le pays de la banque, True pour oui, False pour non
  foreignerIndex: boolean; // index étranger : S (Oui) ou N (Non) si le pays de naissance du client est différent du pays de la banque
  spouseIndex: boolean; // index conjoint : 1 si le client est conjoint d'un employé
  channel: string; // canal utilisé par le client pour rejoindre
  deceasedIndex: boolean; // index de décès : N/S
  addressType: number; // type d'adresse : 1, adresse principale
  provinceCode: number; // code de la province (adresse du client)
  provinceName: string; // nom de la province
  activityIndex: boolean; // index d'activité : 1, client actif ; 0, client inactif
  income: number; // revenu brut du ménage
  segment: string; // segmentation : 01 - VIP, 02 - Individus, 03 - diplômé universitaire
  savingAccount: number; // compte d'épargne
  guarantees: number; // garanties
  currentAccounts: number; // comptes courants
  derivadaAccount: number; // compte dérivé
  payrollAccount: number; // compte de paie
  juniorAccount: number; // compte junior
  masParticularAccount: number; // compte Más particular
  particularAccount: number; // compte particulier
  particularPlusAccount: number; // compte particulier Plus
  shortTermDeposits: number; // dépôts à court terme
  mediumTermDeposits: number; // dépôts à moyen terme
  longTermDeposits: number; // dépôts à long terme
  eaccount: number; // compte électronique
  funds: number; // fonds
  mortgage: number; // hypothèque
  pensions: number; // pensions
  loans: number; // prêts
  taxes: number; // impôts
  creditCard: number; // carte de crédit
  securities: number; // titres
  homeAccount: number; // compte de logement
  payroll: number; // paie
  pensionsTwo: number; // pensions
  directDebit: number; // prélèvement automatique
  password: string;
  balance: number;
  //transactions: Transaction[];
  username: string;
  firstname: string;
  secondname: string;
}
