import { i18n } from "@lingui/core";

import { messages as enMessages } from "@/locales/en/messages";
import { messages as jaMessages } from "@/locales/ja/messages";
import { messages as zhMessages } from "@/locales/zh/messages";

i18n.load({
  zh: zhMessages,
  en: enMessages,
  ja: jaMessages,
});
i18n.activate("zh");

export { i18n };
