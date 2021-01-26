import { isMobile } from './detect-mobile.js'

describe(isMobile, () => {
    test("android browser", () => {
        const ua = "Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30";
        expect(isMobile(ua)).toBe(true);
    });

    test("iPhone browser", () => {
        const ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1";
        expect(isMobile(ua)).toBe(true);
    });

    test("Chrome desktop browser", () => {
        const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36";
        expect(isMobile(ua)).toBe(false);
    });
});