package com.example.Backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private Date fechaDato; // Date d'enregistrement (la table est partitionnée pour cette colonne)
    //private int custId; // code client
    private String empIndex; // index d'employé : A actif, B ex-employé, F filiale, N non employé, P passif
    private String residence; // pays de résidence du client
    private String sex; // sexe du client
    private int age; // âge du client
    private Date firstDate; // date à laquelle le client est devenu le premier titulaire d'un contrat à la banque
    private Boolean newCust; // index de nouveau client, 1 si le client s'est inscrit au cours des 6 derniers mois
    private int seniority; // ancienneté du client en mois
    private int isPrimary; // 1 (Premier/Principal), 99 (Client principal pendant le mois mais pas à la fin du mois)
    private Date lastPrimaryDate; // dernière date en tant que client principal (s'il ne l'est pas à la fin du mois)
    private String custType; // type de client au début du mois : 1 (Premier/Principal client), 2 (co-propriétaire), P (Potentiel)
    private String custRelType; // type de relation du client au début du mois : A (actif), I (inactif), P (ancien client)
    private Boolean residenceIndex; // indiquant si le client réside dans le pays de la banque, True pour oui, False pour non
    private Boolean foreignerIndex; // index étranger : S (Oui) ou N (Non) si le pays de naissance du client est différent du pays de la banque
    private Boolean spouseIndex; // index conjoint : 1 si le client est conjoint d'un employé
    private String channel; // canal utilisé par le client pour rejoindre
    private Boolean deceasedIndex; // index de décès : N/S
    private int addressType; // type d'adresse : 1, adresse principale
    private int provinceCode; // code de la province (adresse du client)
    private String provinceName; // nom de la province
    private Boolean activityIndex; // index d'activité : 1, client actif ; 0, client inactif
    private double income; // revenu brut du ménage
    private String segment; // segmentation : 01 - VIP, 02 - Individus, 03 - diplômé universitaire
    private int savingAccount; // compte d'épargne
    private int guarantees; // garanties
    private int currentAccounts; // comptes courants
    private int derivadaAccount; // compte dérivé
    private int payrollAccount; // compte de paie
    private int juniorAccount; // compte junior
    private int masParticularAccount; // compte Más particular
    private int particularAccount; // compte particulier
    private int particularPlusAccount; // compte particulier Plus
    private int shortTermDeposits; // dépôts à court terme
    private int mediumTermDeposits; // dépôts à moyen terme
    private int longTermDeposits; // dépôts à long terme
    private int eAccount; // compte électronique
    private int funds; // fonds
    private int mortgage; // hypothèque
    private int pensions; // pensions
    private int loans; // prêts
    private int taxes; // impôts
    private int creditCard; // carte de crédit
    private int securities; // titres
    private int homeAccount; // compte de logement
    private int payroll; // paie
    private int pensionsTwo; // pensions
    private int directDebit; // prélèvement automatique

    private String password;
    private double balance;


    private List<Transaction> transactions;
    private String username;

    private String firstname;
    private String secondname;
}



