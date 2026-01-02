
import React from 'react';

export const COLORS = {
  PRIMARY_RED: '#ED1B24',
  DEEP_RED: '#B3141B',
  WHITE: '#FFFFFF',
  GRAY_LIGHT: '#F3F4F6',
  GRAY_DARK: '#374151',
};

export const OFFICIAL_INFO = {
  ar: {
    ORGANIZATION: "الهلال الأحمر الجزائري",
    COMMITTEE: "اللجنة الولائية لسيدي بلعباس",
    MISSION: "إنسانية، تطوعية، محايدة",
  },
  fr: {
    ORGANIZATION: "Croissant-Rouge Algérien",
    COMMITTEE: "Comité de Wilaya de Sidi Bel Abbès",
    MISSION: "Humanitaire, Volontaire, Neutre",
  }
};

export const TRANSLATIONS = {
  ar: {
    home: "الرئيسية",
    verify: "التحقق الرقمي",
    about: "عن المنصة",
    official_service: "بوابة رسمية مؤمنة",
    hero_title: "منصة التحقق من الشهادات",
    hero_desc: "النظام المركزي الرسمي للتحقق من مصداقية الوثائق الصادرة عن اللجنة الولائية لسيدي بلعباس لضمان الشفافية ومكافحة التزوير.",
    verify_now: "بدء التحقق الآن",
    stats_certs: "وثيقة مؤمنة",
    stats_service: "جاهزية النظام",
    stats_acc: "دقة البيانات",
    feature_privacy: "سرية تامة",
    feature_privacy_desc: "نتبع بروتوكولات حماية البيانات الوطنية والدولية في عرض المعلومات.",
    feature_speed: "استجابة فورية",
    feature_speed_desc: "معالجة الطلبات في أقل من 800 ملي ثانية عبر خوادم محلية.",
    feature_tech: "بصمة رقمية",
    feature_tech_desc: "كل شهادة تحمل معرفاً فريداً لا يمكن تكراره أو التلاعب به.",
    search_placeholder: "أدخل الرقم التسلسلي (مثال: ARC-SBA-2024-001)",
    search_btn: "تحقق من قاعدة البيانات",
    search_loading: "جاري الاتصال بالسجل المركزي...",
    scan_qr: "مسح رمز الاستجابة (QR)",
    manual_input: "إدخال يدوي للرقم",
    not_found: "تنبيه: لم يتم العثور على سجل مطابق في قاعدة البيانات الرسمية.",
    cert_details_title: "بيان المطابقة الرقمي",
    cert_status: "حالة الوثيقة",
    cert_valid: "وثيقة أصلية سارية",
    cert_expired: "وثيقة منتهية الصلاحية",
    cert_revoked: "وثيقة ملغاة رسمياً",
    cert_recipient: "المستفيد من الشهادة",
    cert_course: "نوع التأهيل / الدورة",
    cert_date: "تاريخ المنح",
    cert_expiry: "صالح لغاية",
    cert_issuer: "سلطة الاعتماد",
    print: "استخراج نسخة PDF",
    verify_another: "بحث جديد",
    footer_desc: "الهلال الأحمر الجزائري - لجنة سيدي بلعباس تعمل وفق مبادئ الحركة الدولية للصليب الأحمر والهلال الأحمر.",
    footer_links: "روابط هامة",
    footer_contact: "العنوان الرسمي",
    footer_rights: "جميع الحقوق محفوظة © الهلال الأحمر الجزائري",
    security_notice: "تنبيه قانوني: أي تلاعب في هذه الصفحة يقع تحت طائلة قانون الجرائم المعلوماتية.",
    disclaimer: "هذه المنصة مخصصة لأغراض التحقق فقط ولا تعتبر بديلاً عن الوثيقة الأصلية.",
    address: "شارع الشهداء، سيدي بلعباس، الجزائر"
  },
  fr: {
    home: "Accueil",
    verify: "Vérification",
    about: "À propos",
    official_service: "Portail Officiel Sécurisé",
    hero_title: "Vérification des Certificats",
    hero_desc: "Système central officiel pour vérifier l'authenticité des documents délivrés par le comité de Sidi Bel Abbès.",
    verify_now: "Vérifier Maintenant",
    stats_certs: "Documents Sécurisés",
    stats_service: "Disponibilité",
    stats_acc: "Précision Globale",
    feature_privacy: "Confidentialité",
    feature_privacy_desc: "Nous respectons les protocoles de protection des données nationales.",
    feature_speed: "Réponse Instantanée",
    feature_speed_desc: "Traitement des requêtes en moins de 800ms.",
    feature_tech: "Empreinte Numérique",
    feature_tech_desc: "Identifiant unique infalsifiable pour chaque certificat.",
    search_placeholder: "N° de série (Ex: ARC-SBA-2024-001)",
    search_btn: "Vérifier la base de données",
    search_loading: "Connexion au registre central...",
    scan_qr: "Scanner Code QR",
    manual_input: "Saisie Manuelle",
    not_found: "Alerte : Aucun enregistrement correspondant trouvé.",
    cert_details_title: "Certificat de Conformité",
    cert_status: "Statut du Document",
    cert_valid: "Document Authentique",
    cert_expired: "Document Expiré",
    cert_revoked: "Document Révoqué",
    cert_recipient: "Bénéficiaire",
    cert_course: "Type de Qualification",
    cert_date: "Date d'Émission",
    cert_expiry: "Valable jusqu'au",
    cert_issuer: "Autorité de Délivrance",
    print: "Exporter en PDF",
    verify_another: "Nouvelle Recherche",
    footer_desc: "Le CRA de Sidi Bel Abbès opère selon les principes du Mouvement International.",
    footer_links: "Liens Utiles",
    footer_contact: "Adresse Officielle",
    footer_rights: "Tous droits réservés © CRA Algérie",
    security_notice: "Avis Légal : Toute altération est passible de poursuites pénales.",
    disclaimer: "Cette plateforme est destinée uniquement à la vérification.",
    address: "Rue des Martyrs, Sidi Bel Abbès, Algérie"
  }
};

export const RedCrescentLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M80,50 C80,66.57 66.57,80 50,80 C40,80 31,75 25,67 C35,75 48,75 58,67 C68,59 70,45 62,35 C58,30 52,27 46,25 C65,25 80,36 80,50 Z" 
      fill={COLORS.PRIMARY_RED} 
    />
  </svg>
);
