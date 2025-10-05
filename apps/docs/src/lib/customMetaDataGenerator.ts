import { Metadata } from "next";
import { createMetadataImage } from "fumadocs-core/server";
import { source } from "./source";

interface PageSEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?:
    | "website"
    | "article"
    | "book"
    | "profile"
    | "music.song"
    | "music.album"
    | "music.playlist"
    | "music.radio_station"
    | "video.movie"
    | "video.episode"
    | "video.tv_show"
    | "video.other";
  ogImage?: string;
  twitterCard?: "summary_large_image" | "summary" | "player" | "app";
  keywords?: string[];
}

export function customMetaDataGenerator({
  title = "Craft an amazing website with just copy/paste",
  description = "Modern, responsive, customizable UI components. Copy, adapt, and personalize them.",
  canonicalUrl = "https://ui.libravelabs.com",
  ogType = "website",
  keywords = [
    "web components, web design, UI components, responsive design, modern design, reusable components, front-end development, web development, user interface, beautiful UI, stunning components, zero effort, copy-paste components, web elements, website building blocks, web templates, UI kits, design resources, front-end tools, web design inspiration, web design trends, web design solutions, design tools, web design assets, UI design, UX design, web design components, web UI, responsive web components, modern web components, beautiful web components, stunning web UI, web design elements, web UI kits, responsive UI kits, modern UI kits, web design assets, front-end web development, web development resources, web components library, web UI library, web design library, responsive web design, modern web design, beautiful web design, stunning web design, web design resources, web development tools, front-end web development tools, web design inspiration resources, web design trends resources, web design solutions resources, web UI solutions, web design asset resources, UI design resources, UX design resources, web component templates, web UI templates, web design templates, responsive web templates, modern web templates, beautiful web templates, stunning web templates, web template kits, web component kits, web UI kits, web design kits, responsive web kits, modern web kits, beautiful web kits, stunning web kits, no-code web design, easy web design, web design made easy, easy web development, no-code web development, web design for beginners, web development for beginners, beginner-friendly web design, beginner-friendly web development, drag-and-drop web design, drag-and-drop web development, visual web design, visual web development, WYSIWYG web design, WYSIWYG web development, web design platforms, web development platforms, web design tools, web development tools, web design software, web development software, web design apps, web development apps, web design plugins, web development plugins, web design extensions, web development extensions, web design integrations, web development integrations, web design solutions, web development solutions, web design services, web development services, web design agencies, web development agencies, web design freelancers, web development freelancers, web design consultants, web development consultants, web design experts, web development experts, web design professionals, web development professionals, web design gurus, web development gurus, web design maestros, web development maestros, web design masters, web development masters, web design ninjas, web development ninjas, web design rockstars, web development rockstars, web design superstars, web development superstars, web design wizards, web development wizards, web design magicians, web development magicians, web design sorcerers, web development sorcerers, web design alchemists, web development alchemists, web design virtuosos, web development virtuosos, web design savants, web development savants, web design prodigies, web development prodigies, web design mavericks, web development mavericks, web design pioneers, web development pioneers, web design innovators, web development innovators, web design trailblazers, web development trailblazers, web design trendsetters, web development trendsetters, web design visionaries, web development visionaries, web design futurists, web development futurists, web design revolutionaries, web development revolutionaries, web design disruptors, web development disruptors, web design game-changers, web development game-changers, web design changemakers, web development changemakers, web design transformers, web development transformers, web design movers, web development movers, web design shakers, web development shakers, web design influencers, web development influencers, web design thought leaders, web development thought leaders, web design luminaries, web development luminaries, web design geniuses, web development geniuses, web design masterminds, web development masterminds, web design authorities, web development authorities, web design subject matter experts, web development subject matter experts, web design eminences, web development eminences, web design notables, web development notables, web design celebrities, web development celebrities, web design icons, web development icons, web design legends, web development legends, web design virtuosos, web development virtuosos, web design phenoms, web development phenoms, web design sensations, web development sensations, web design wunderkinds, web development wunderkinds, web design prodigies, web development prodigies, web design marvels, web development marvels, web design miracles, web development miracles, web design wonders, web development wonders, web design phenomenons, web development phenomenons, web design anomalies, web development anomalies, web design rarities, web development rarities, web design unicorns, web development unicorns, web design extraordinaires, web development extraordinaires, web design virtuosos, web development virtuosos, web design maestros, web development maestros, web design masters, web development masters, LibravelUI, LibravelUI, LibravelUI, LibravelUI, LibravelUI, LibravelUI web components, LibravelUI web design, LibravelUI UI components, LibravelUI responsive design, LibravelUI modern design, LibravelUI reusable components, LibravelUI front-end development, LibravelUI web development, LibravelUI user interface, LibravelUI beautiful UI, LibravelUI stunning components, LibravelUI web elements, LibravelUI website building blocks, LibravelUI web templates, LibravelUI UI kits, LibravelUI design resources, LibravelUI front-end tools, LibravelUI web design inspiration, LibravelUI web design trends, LibravelUI web design solutions, LibravelUI design tools, LibravelUI web design assets, LibravelUI UI design, LibravelUI UX design, LibravelUI web design components, LibravelUI web UI, LibravelUI responsive web components, LibravelUI modern web components, LibravelUI beautiful web components, LibravelUI stunning web UI, LibravelUI web design elements, LibravelUI web UI kits, LibravelUI responsive UI kits, LibravelUI modern UI kits, LibravelUI web design assets, LibravelUI front-end web development, LibravelUI web development resources, LibravelUI web components library, LibravelUI web UI library, LibravelUI web design library, LibravelUI best web components, LibravelUI top web design, LibravelUI premium UI components, LibravelUI high-quality responsive design, LibravelUI cutting-edge modern design, LibravelUI professional reusable components, LibravelUI expert front-end development, LibravelUI skilled web development, LibravelUI beautiful user interface, LibravelUI stunning UI components, LibravelUI zero-effort web elements, LibravelUI easy website building blocks, LibravelUI professional web templates, LibravelUI premium UI kits, LibravelUI top design resources, LibravelUI best front-end tools, LibravelUI inspiring web design, LibravelUI leading web design trends, LibravelUI innovative web design solutions, LibravelUI advanced design tools, LibravelUI high-quality web design assets, LibravelUI expert UI design, LibravelUI professional UX design, LibravelUI top web design components, LibravelUI beautiful web UI, LibravelUI responsive web components, LibravelUI modern web components, LibravelUI stunning web UI, LibravelUI professional web design elements, LibravelUI premium web UI kits, LibravelUI high-quality responsive UI kits, LibravelUI cutting-edge modern UI kits, LibravelUI top web design assets, LibravelUI expert front-end web development, LibravelUI professional web development resources, LibravelUI best web components library, LibravelUI top web UI library, LibravelUI premium web design library, web components, web design, UI components, responsive design, modern design, reusable components, front-end development, web development, user interface, beautiful UI, stunning components, zero effort, copy-paste components, web elements, website building blocks, web templates, UI kits, design resources, front-end tools, web design inspiration, web design trends, web design solutions, design tools, web design assets, UI design, UX design, web design components, web UI, responsive web components, modern web components, beautiful web components, stunning web UI, web design elements, web UI kits, responsive UI kits, modern UI kits, web design assets, front-end web development, web development resources, web components library, web UI library, web design library, responsive web design, modern web design, beautiful web design, stunning web design, web design resources, web development tools, front-end web development tools, web design inspiration resources, web design trends resources, web design solutions resources, web UI solutions, web design asset resources, UI design resources, UX design resources, web component templates, web UI templates, web design templates, responsive web templates, modern web templates, beautiful web templates, stunning web templates, web template kits, web component kits, web UI kits, web design kits, responsive web kits, modern web kits, beautiful web kits, stunning web kits, LibravelUI, LibravelUI, LibravelUI, LibravelUI, LibravelUI web components, LibravelUI web design, LibravelUI UI components, LibravelUI responsive design, LibravelUI modern design, LibravelUI reusable components, LibravelUI front-end development, LibravelUI web development, LibravelUI user interface, LibravelUI beautiful UI, LibravelUI stunning components, LibravelUI web elements, LibravelUI website building blocks, LibravelUI web templates, LibravelUI UI kits, LibravelUI design resources, LibravelUI front-end tools, LibravelUI web design inspiration, LibravelUI web design trends, LibravelUI web design solutions, LibravelUI design tools, LibravelUI web design assets, LibravelUI UI design, LibravelUI UX design, LibravelUI web design components, LibravelUI web UI, LibravelUI responsive web components, LibravelUI modern web components, LibravelUI beautiful web components, LibravelUI stunning web UI, LibravelUI web design elements, LibravelUI web UI kits, LibravelUI responsive UI kits, LibravelUI modern UI kits, LibravelUI web design assets, LibravelUI front-end web development, LibravelUI web development resources, LibravelUI web components library, LibravelUI web UI library, LibravelUI web design library",
  ],
  ogImage = "https://url-to-your-image-this-is-a-default-value-for-optional-parameter",
  twitterCard = "summary_large_image",
}: PageSEOProps): Metadata {
  const siteTitle = "LibravelUI";
  const fullTitle = `${title} — ${siteTitle}`;

  const metadataImage =
    ogImage ||
    createMetadataImage({
      imageRoute: "/docs-og",
      source,
    });

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      images: [
        {
          url: `${metadataImage}`,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [{ url: `${metadataImage}` }],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
