import { IconType } from 'react-icons';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaDiscord, FaTiktok, FaTwitch, FaYoutube, FaAmazon, FaGooglePlay, FaApple, FaPodcast, FaDoorOpen, FaEtsy, FaPatreon, FaPinterest, FaSignal, FaSnapchat, FaSoundcloud, FaSpotify, FaTelegram } from 'react-icons/fa';

export interface SocialPlatform {
    value: string;
    label: string;
    icon: IconType;
    profile?: string;
}

export const socialPlatforms: SocialPlatform[] = [
    { value: "facebook", label: "Facebook", icon: FaFacebook, profile: "https://www.facebook.com/" },
    { value: "twitter", label: "Twitter", icon: FaTwitter, profile: "https://twitter.com/" },
    { value: "instagram", label: "Instagram", icon: FaInstagram, profile: "https://www.instagram.com/" },
    { value: "linkedin", label: "LinkedIn", icon: FaLinkedin, profile: "https://www.linkedin.com/in/" },
    { value: "discord", label: "Discord", icon: FaDiscord, profile: "https://discord.gg/invite/" },
    { value: "tiktok", label: "TikTok", icon: FaTiktok, profile: "https://www.tiktok.com/@" },
    { value: "twitch", label: "Twitch", icon: FaTwitch, profile: "https://www.twitch.tv/" },
    { value: "youtube", label: "YouTube", icon: FaYoutube, profile: "https://www.youtube.com/user/" },
    { value: "amazon-shop", label: "Amazon Shop", icon: FaAmazon, profile: "https://www.amazon.com/shop/" },
    { value: "android-playstore", label: "Android Playstore", icon: FaGooglePlay },
    { value: "apple-appstore", label: "Apple App store", icon: FaApple },
    { value: "apple-podcast", label: "Apple Podcast", icon: FaPodcast, profile: "https://podcasts.apple.com/us/podcast/" },
    { value: "clubhouse", label: "Clubhouse", icon: FaDoorOpen, profile: "https://www.joinclubhouse.com/@" },
    { value: "etsy", label: "Etsy", icon: FaEtsy, profile: "https://www.etsy.com/shop/" },
    { value: "patreon", label: "Patreon", icon: FaPatreon, profile: "https://www.patreon.com/" },
    { value: "pinterest", label: "Pinterest", icon: FaPinterest, profile: "https://www.pinterest.com/" },
    { value: "signal", label: "Signal", icon: FaSignal },
    { value: "snapchat", label: "Snapchat", icon: FaSnapchat },
    { value: "soundcloud", label: "SoundCloud", icon: FaSoundcloud, profile: "https://soundcloud.com/" },
    { value: "spotify", label: "Spotify", icon: FaSpotify, profile: "https://open.spotify.com/user/" },
    { value: "telegram", label: "Telegram", icon: FaTelegram },
];

export function getIconByName(name: string): IconType {
    const platform: SocialPlatform | undefined = socialPlatforms.find((p) => p.value === name);
    return platform ? platform.icon : FaTwitter;
}

export function getProfileURL(platform: string, profile: string): string {
    return socialPlatforms.find((p) => p.value === platform)?.profile + profile
}