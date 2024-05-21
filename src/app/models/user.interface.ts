export interface User {
  user_id?: string;
  nick: string;
  password: string;
  rol: string;
  create_date: Date;
  name: string;
  surnames: string;
  community_id: string;
  building: string;
  floor: string;
  door: string;
  contact_phone: string;
  contact_email: string;
}

export interface Community {
  community_id: string;
  community_name: string;
  community_direction: string;
  community_ZIP: string;
  community_localion: string;
  community_contact_phone: string;
  community_contact_email: string;
  community_comments: string;
}

export interface AsideButton {
  text: string;
  text_en: string;
  href: string;
}

export interface Card {
  cardImageUrl: string;
  cardImageAlt: string;
  cardImageAlt_en: string;
  cardTitle: string;
  cardTitle_en: string;
  cardText: string;
  cardText_en: string;
}

export interface Doc {
  document_id: string;
  activo: string;
  document_type: string;
  document_title: string;
  document_insert_date: string;
  document_link: string;
  document_community_id: string;
}

export interface Booking {
  booking_id: string;
  booking_user_id: string;
  booking_timestamp: Date;
  booking_date: string;
  booking_installation: string;
  booking_time: string;
  booking_community_id: string;
}

export interface CarouselItem {
  title: string;
  title_en: string;
  text_es: string;
  text_en: string;
  url: string;
}

export interface Notice {
  notice_id: string;
  notice_user_id: string;
  notice_community_id: string;
  notice_type: string;
  notice_title: string;
  notice_insert_date: string;
  notice_elimination_date: string;
  notice_link: string;
}


export interface AlertMessages {
  [key: string]: string;
  es: string;
  en: string;
}

export interface TranslationElement {
  [key: string]: string;
  es: string;
  en: string;
}
