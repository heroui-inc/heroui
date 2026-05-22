import {zhCN} from "@fumadocs/language/zh-cn";
import {uiTranslations} from "fumadocs-ui/i18n";

import {i18n} from "@/lib/i18n";

export const translations = i18n.translations().extend(uiTranslations()).preset("cn", zhCN());
