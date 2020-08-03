Vue.component('color-input-container', {
    props: [
        'colors',
        'categoryname',
        'propertyname',
        'theme'
    ],
    data() {
        return {
            currentColors: this.colors[this.categoryname][this.propertyname]['hex'],
            currentType: 'custom',
            lastCustomHex: {
                light: '',
                dark: ''
            }
        }
    },
    template: `<div class="color-input-container">
        <div v-for="(colorHex, colorMode) in colors[categoryname][propertyname]['hex']" class="color-input">
            <span v-bind:style="{ background: colorHex }" class="color-preview"></span>
            <input type="text"
                v-model="colors[categoryname][propertyname]['hex'][colorMode]"
                v-bind:disabled="disableInput(categoryname, propertyname)">
        </div>
        <span class="color-input-options" v-bind:class="{ 'options-available': colors[categoryname][propertyname]['hasOptions'] }">
            <button class="button-options-expand" v-on:click="toggleShowOptions($event.target)" v-bind:id="propertyname + 'OptionsButton'" title="More options">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="20" cy="12" r="2"/>
                    <circle cx="4" cy="12" r="2"/>
                </svg>
            </button>
            <div class="color-input-options-menu">
                <label>
                    <input type="radio" value="primary"
                        v-model="currentType"
                        v-bind:name="'radio_' + propertyname">
                    <svg class="radio-button-handle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <polyline points="4 12 9 17 20 6"/>
                    </svg>
                    Use primary
                </label>
                <label>
                    <input type="radio" value="secondary"
                        v-model="currentType"
                        v-bind:name="'radio_' + propertyname">
                    <svg class="radio-button-handle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <polyline points="4 12 9 17 20 6"/>
                    </svg>
                    Use secondary
                </label>
                <label>
                    <input type="radio" value="custom"
                        v-model="currentType"
                        v-bind:name="'radio_' + propertyname" checked>
                    <svg class="radio-button-handle" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <polyline points="4 12 9 17 20 6"/>
                    </svg>
                    Use custom
                </label>
                <button class="button-options-close" v-on:click="hideOptions(propertyname)" title="More options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="12" y1="4" x2="4" y2="12"/>
                        <line x1="4" y1="4" x2="12" y2="12"/>
                    </svg>
                </button>
            </div>
        </span>
    </div>`,
    methods: {
        disableInput(categoryName, propertyName) {
            if (this.colors[categoryName][propertyName]['hasOptions'] && this.currentType !== 'custom') {
                return true;
            }
        },

        // Used for showing/hiding the options menu for items on the Theme panel
        toggleShowOptions(element) {
            element.classList.toggle("options-shown");
            return true;
        },

        // Used for hiding the options menu for items on the Theme panel
        hideOptions(propertyName) {
            let e = document.getElementById(propertyName + "OptionsButton");

            e.classList.remove("options-shown");
            return true;
        },

        setThemeToCustom() {
            console.log(this.theme);
            this.theme = 'Custom'
            this.$emit('themeWasChanged', this.theme)
            console.log(this.theme);
            
        }
    },
    watch: {
        colors: {
            handler: function (newValue, oldValue) {
                if (this.colors[this.categoryname][this.propertyname]['hasOptions'] && this.currentType !== 'custom') {
                    this.currentColors['light'] = this.colors['Main Colors'][this.currentType]['hex']['light'];
                    this.currentColors['dark'] = this.colors['Main Colors'][this.currentType]['hex']['dark'];
                }
            },
            deep: true
        },
        currentType(newType, oldType) {
            if (newType !== 'custom') {
                if (oldType ==='custom') {
                    this.lastCustomHex['light'] = this.currentColors['light'];
                    this.lastCustomHex['dark'] = this.currentColors['dark'];
                }
                this.currentColors['light'] = this.colors['Main Colors'][newType]['hex']['light'];
                this.currentColors['dark'] = this.colors['Main Colors'][newType]['hex']['dark'];
            } else if (this.lastCustomHex['light'] !== '') {
                this.currentColors['light'] = this.lastCustomHex['light'];
                this.currentColors['dark'] = this.lastCustomHex['dark'];
            }
        }
    }
});

new Vue({
    el: "#blah",
    data: {
        colors: {
            "Main Colors": {
                primary:           { hex: { light: "#D22630", dark: "#D22630" }, hasOptions: false },
                primary_active:    { hex: { light: "#FFFFFF", dark: "#FFFFFF" }, hasOptions: false },
                secondary:         { hex: { light: "#34495E", dark: "#4C4F55" }, hasOptions: false },
                secondary_active:  { hex: { light: "#FFFFFF", dark: "#FFFFFF" }, hasOptions: false },
            },
            "Navigation": {
                header:            { hex: { light: "#D22630", dark: "#2A2E33" }, hasOptions: true },
                header_active:     { hex: { light: "#FFFFFF", dark: "#D22630" }, hasOptions: false },
                header_inactive:   { hex: { light: "#34495E", dark: "#E2E5E9" }, hasOptions: false },
                navbar:            { hex: { light: "#FFFFFF", dark: "#2A2E33" }, hasOptions: true },
                navbar_active:     { hex: { light: "#D22630", dark: "#D22630" }, hasOptions: false },
                navbar_inactive:   { hex: { light: "#34495E", dark: "#E2E5E9" }, hasOptions: false },
            },
            "Elements": {
                background:        { hex: { light: "#E2E5E9", dark: "#1F2429" }, hasOptions: true },
                background_active: { hex: { light: "#1F2429", dark: "#FFFFFF" }, hasOptions: false },
                surface:           { hex: { light: "#FFFFFF", dark: "#33373D" }, hasOptions: true },
                surface_active:    { hex: { light: "#1F2429", dark: "#FFFFFF" }, hasOptions: false },
                button:            { hex: { light: "#D22630", dark: "#D22630" }, hasOptions: true },
                button_border:     { hex: { light: "#D22630", dark: "#D22630" }, hasOptions: true },
                button_active:     { hex: { light: "#FFFFFF", dark: "#FFFFFF" }, hasOptions: false },
                button_disabled:   { hex: { light: "#EAAFB3", dark: "#EAAFB3" }, hasOptions: false },
                button2:           { hex: { light: "#FFFFFF", dark: "#33373D" }, hasOptions: true },
                button2_border:    { hex: { light: "#D22630", dark: "#D22630" }, hasOptions: true },
                button2_active:    { hex: { light: "#D22630", dark: "#D22630" }, hasOptions: false },
                button2_disabled:  { hex: { light: "#E0E0E0", dark: "#E0E0E0" }, hasOptions: false },

            },
            "Miscellaneous": {
                danger:            { hex: { light: "#E11C24", dark: "#E11C24" }, hasOptions: true },
                warning:           { hex: { light: "#FFC107", dark: "#FFC107" }, hasOptions: true },
                success:           { hex: { light: "#4CAF50", dark: "#4CAF50" }, hasOptions: true },
                info:              { hex: { light: "#1F92ED", dark: "#1F92ED" }, hasOptions: true },
            }
        },
        themes: {
            "Custom": {
                // this one's intentionally blank
            },
            "Default": {
                "Main Colors": {
                    primary:           { light: "#D22630", dark: "#D22630" },
                    primary_active:    { light: "#FFFFFF", dark: "#FFFFFF" },
                    secondary:         { light: "#34495E", dark: "#4C4F55" },
                    secondary_active:  { light: "#FFFFFF", dark: "#FFFFFF" },
                },
                "Navigation": {
                    header:            { light: "#D22630", dark: "#2A2E33" },
                    header_active:     { light: "#FFFFFF", dark: "#D22630" },
                    header_inactive:   { light: "#34495E", dark: "#E2E5E9" },
                    navbar:            { light: "#FFFFFF", dark: "#2A2E33" },
                    navbar_active:     { light: "#D22630", dark: "#D22630" },
                    navbar_inactive:   { light: "#34495E", dark: "#E2E5E9" },
                },
                "Elements": {
                    background:        { light: "#E2E5E9", dark: "#1F2429" },
                    background_active: { light: "#1F2429", dark: "#FFFFFF" },
                    surface:           { light: "#FFFFFF", dark: "#33373D" },
                    surface_active:    { light: "#1F2429", dark: "#FFFFFF" },
                    button:            { light: "#D22630", dark: "#D22630" },
                    button_border:     { light: "#D22630", dark: "#D22630" },
                    button_active:     { light: "#FFFFFF", dark: "#FFFFFF" },
                    button_disabled:   { light: "#EAAFB3", dark: "#EAAFB3" },
                    button2:           { light: "#FFFFFF", dark: "#33373D" },
                    button2_border:    { light: "#D22630", dark: "#D22630" },
                    button2_active:    { light: "#D22630", dark: "#D22630" },
                    button2_disabled:  { light: "#E0E0E0", dark: "#E0E0E0" },

                },
                "Miscellaneous": {
                    danger:            { light: "#E11C24", dark: "#E11C24" },
                    warning:           { light: "#FFC107", dark: "#FFC107" },
                    success:           { light: "#4CAF50", dark: "#4CAF50" },
                    info:              { light: "#1F92ED", dark: "#1F92ED" },
                }
            },
            "Cobalt": {
                "Main Colors": {
                    primary:           { light: "#1B6098", dark: "#1B6098" },
                    primary_active:    { light: "#FFFFFF", dark: "#FFFFFF" },
                    secondary:         { light: "#34495E", dark: "#7A8FA4" },
                    secondary_active:  { light: "#FFFFFF", dark: "#FFFFFF" },
                },
                "Navigation": {
                    header:            { light: "#1B6098", dark: "#2A2E33" },
                    header_active:     { light: "#E2E5E9", dark: "#1B6098" },
                    header_inactive:   { light: "#34495E", dark: "#E2E5E9" },
                    navbar:            { light: "#FFFFFF", dark: "#2A2E33" },
                    navbar_active:     { light: "#1F92ED", dark: "#1F92ED" },
                    navbar_inactive:   { light: "#7A8FA4", dark: "#E2E5E9" },
                },
                "Elements": {
                    background:        { light: "#DCE7F6", dark: "#13161A" },
                    background_active: { light: "#34495E", dark: "#E2E5E9" },
                    surface:           { light: "#FFFFFF", dark: "#2B2E33" },
                    surface_active:    { light: "#34495E", dark: "#E2E5E9" },
                    button:            { light: "#1B6098", dark: "#1B6098" },
                    button_border:     { light: "#1B6098", dark: "#1B6098" },
                    button_active:     { light: "#FFFFFF", dark: "#FFFFFF" },
                    button_disabled:   { light: "#B7D0E5", dark: "#B7D0E5" },
                    button2:           { light: "#FFFFFF", dark: "#33373D" },
                    button2_border:    { light: "#1B6098", dark: "#1B6098" },
                    button2_active:    { light: "#1B6098", dark: "#1B6098" },
                    button2_disabled:  { light: "#E0E0E0", dark: "#E0E0E0" },
                },
                "Miscellaneous": {
                    danger:            { light: "#E11C24", dark: "#E11C24" },
                    warning:           { light: "#FFC107", dark: "#FFC107" },
                    success:           { light: "#4CAF50", dark: "#4CAF50" },
                    info:              { light: "#1F92ED", dark: "#1F92ED" },
                } 
            },
            "Sun Shine": {
                "Main Colors": {
                    primary:           { light: "#F3CA23", dark: "#161718" },
                    primary_active:    { light: "#BC740D", dark: "#F3CA23" },
                    secondary:         { light: "#F4DC7C", dark: "#4C4F55" },
                    secondary_active:  { light: "#BC740D", dark: "#F3CA23" },
                },
                "Navigation": {
                    header:            { light: "#F3CA23", dark: "#2A2E33" },
                    header_active:     { light: "#6E5706", dark: "#F3CA23" },
                    header_inactive:   { light: "#34495E", dark: "#E2E5E9" },
                    navbar:            { light: "#FFFFFF", dark: "#2A2E33" },
                    navbar_active:     { light: "#F3CA23", dark: "#F3CA23" },
                    navbar_inactive:   { light: "#949494", dark: "#E2E5E9" },
                },
                "Elements": {
                    background:        { light: "#F9F0CD", dark: "#1F2429" },
                    background_active: { light: "#BC740D", dark: "#F3CA23" },
                    surface:           { light: "#FFFFFF", dark: "#33373D" },
                    surface_active:    { light: "#BC740D", dark: "#F9F0CD" },
                    button:            { light: "#F3CA23", dark: "#F3CA23" },
                    button_border:     { light: "#F3CA23", dark: "#F3CA23" },
                    button_active:     { light: "#6E5706", dark: "#33373D" },
                    button_disabled:   { light: "#B7D0E5", dark: "#B7D0E5" },
                    button2:           { light: "#FFFFFF", dark: "#33373D" },
                    button2_border:    { light: "#BC740D", dark: "#BC740D" },
                    button2_active:    { light: "#BC740D", dark: "#BC740D" },
                    button2_disabled:  { light: "#E0E0E0", dark: "#E0E0E0" },
                },
                "Miscellaneous": {
                    danger:            { light: "#E11C24", dark: "#E11C24" },
                    warning:           { light: "#FFC107", dark: "#FFC107" },
                    success:           { light: "#4CAF50", dark: "#4CAF50" },
                    info:              { light: "#1F92ED", dark: "#1F92ED" },
                } 
            },
            "Swampy": {
                "Main Colors": {
                    primary:           { light: "#1F7751", dark: "#1F7751" },
                    primary_active:    { light: "#FFFFFF", dark: "#FFFFFF" },
                    secondary:         { light: "#34495E", dark: "#4C4F55" },
                    secondary_active:  { light: "#FFFFFF", dark: "#FFFFFF" },
                },
                "Navigation": {
                    header:            { light: "#1F7751", dark: "#2A2E33" },
                    header_active:     { light: "#FFFFFF", dark: "#4CAF50" },
                    header_inactive:   { light: "#34495E", dark: "#E2E5E9" },
                    navbar:            { light: "#FFFFFF", dark: "#2A2E33" },
                    navbar_active:     { light: "#4CAF50", dark: "#4CAF50" },
                    navbar_inactive:   { light: "#576E86", dark: "#E2E5E9" },
                },
                "Elements": {
                    background:        { light: "#E2E5E9", dark: "#1F2429" },
                    background_active: { light: "#1F2429", dark: "#FFFFFF" },
                    surface:           { light: "#FFFFFF", dark: "#33373D" },
                    surface_active:    { light: "#1F2429", dark: "#FFFFFF" },
                    button:            { light: "#1F7751", dark: "#4CAF50" },
                    button_border:     { light: "#1F7751", dark: "#4CAF50" },
                    button_active:     { light: "#FFFFFF", dark: "#33373D" },
                    button_disabled:   { light: "#B7D0E5", dark: "#B7D0E5" },
                    button2:           { light: "#FFFFFF", dark: "#33373D" },
                    button2_border:    { light: "#1F7751", dark: "#4CAF50" },
                    button2_active:    { light: "#1F7751", dark: "#4CAF50" },
                    button2_disabled:  { light: "#E0E0E0", dark: "#E0E0E0" },
                },
                "Miscellaneous": {
                    danger:            { light: "#E11C24", dark: "#E11C24" },
                    warning:           { light: "#FFC107", dark: "#FFC107" },
                    success:           { light: "#4CAF50", dark: "#4CAF50" },
                    info:              { light: "#1F92ED", dark: "#1F92ED" },
                } 
            }
        },
        currentTheme: "Default",
        subpageIsActive: false,
        subpageHeader: ""
    },
    computed: {
        // Checks all the properties in the colors object to see which has the longest name (used in the output section)
        longestPropertyNameLength() {
            let longestName = "";

            for (let categoryName in this.colors) {
                for (let propertyName in this.colors[categoryName]) {

                    if (propertyName.length > longestName.length) {
                        longestName = propertyName;
                    }
                }
            }

            return longestName.length;
        },

        // Iterate through the colors object to get the last property value (e.g. "info" in "Miscellaneous")
        lastPropertyValue() {
            let colorsKeys = Object.keys(this.colors),
                colorsLastKey = colorsKeys[colorsKeys.length - 1],
                colorsLastKeyProperties = Object.keys(this.colors[colorsLastKey]),
                colorsLastKeyLastProperty = colorsLastKeyProperties[colorsLastKeyProperties.length - 1];

            return colorsLastKeyLastProperty;
        },

        // Iterate through the colors object to get the last color mode (e.g. "light" or "dark")
        lastColorModeValue() {
            let colorsKeys = Object.keys(this.colors),
                colorsLastKey = colorsKeys[colorsKeys.length - 1],
                colorsLastKeyProperties = Object.keys(this.colors[colorsLastKey]),
                colorsLastKeyLastProperty = colorsLastKeyProperties[colorsLastKeyProperties.length - 1],
                colorModeKeys = Object.keys(this.colors[colorsLastKey][colorsLastKeyLastProperty])
                lastColorMode = colorModeKeys[colorModeKeys.length - 1];

            return lastColorMode;
        },

        // 
        currentPageHeader() {
            if (this.subpageIsActive) {
                return this.subpageHeader;
            } else {
                return "Header";
            }
        }
    },
    methods: {

        // Used in "Light Mode" & "Dark Mode" text above each phone preview
        capitalizeString(string) {
            return string[0].toUpperCase() + string.slice(1);
        },

        // Used to apply the dark mode class to the phone preview
        checkIfDarkMode(mode) {
            if (mode == "dark") {
                return true;
            } else {
                return false;
            }
        },

        // Adds the right amount of spacing between the property name & hex code in the output section
        outputSpacing(inputName) {
            return 1 + (this.longestPropertyNameLength - inputName.length);
        },

        // Set all the current colors to one of the preset theme's colors in the dropdown menu
        applyPresetTheme(themeName) {
            // this.currentTheme = themeName;

            for (let categoryName in this.colors) {
                for (let propertyName in this.colors[categoryName]) {
                    for (let colorMode in this.colors[categoryName][propertyName]['hex']) {
                        this.colors[categoryName][propertyName]['hex'][colorMode] = this.themes[themeName][categoryName][propertyName][colorMode];
                    }
                }
            }
        },

        setCurrentThemeToCustom(event) {
            console.log("Hi")
            theme = "Custom";
        },

        // This is used to determine whether dark/light text should be used based on how light/dark the background is
        getLightnessFromHex(hexInput) {
            // Convert hex to RGB first
            let r = 0,
                g = 0,
                b = 0;
            
            // For 3-digit hex codes (e.g. #000)
            if (hexInput.length == 4) {
                r = ("0x" + hexInput[1] + hexInput[1]) / 255;
                g = ("0x" + hexInput[2] + hexInput[2]) / 255;
                b = ("0x" + hexInput[3] + hexInput[3]) / 255;
            }
            
            // For 6-digit hex codes (e.g. #000000)
            else if (hexInput.length == 7) {
                r = ("0x" + hexInput[1] + hexInput[2]) / 255;
                g = ("0x" + hexInput[3] + hexInput[4]) / 255;
                b = ("0x" + hexInput[5] + hexInput[6]) / 255;
            }
            
            // If the hex input isn't in a standard format, stop trying to calculate its lightness
            else {
                return;
            }

            // Normalize RGB values based on relative luminance (en.wikipedia.org/wiki/Relative_luminance) so yellows don't give us janky results
            r *= 0.2126;
            g *= 0.7152;
            b *= 0.0722;

            // Return the color's lightness on a scale from 1 (max brightness) to 0 (no brightness)
            return r + g + b;
        },
        headerDark(colorMode) {
            let hexValue = this.colors["Navigation"]["header"]["hex"][colorMode],
                lightness = this.getLightnessFromHex(hexValue);

            if (lightness > 0.5) {
                return true;
            } else {
                return false;
            }
        },
        outputCommaAfterProperty(propertyName) {
            if (propertyName == this.lastPropertyValue) {
                return false;
            } else {
                return true;
            }
        },
        outputCommaAfterColorMode(colorMode) {
            if (colorMode == this.lastColorModeValue) {
                return false;
            } else {
                return true;
            }
        },

        // Used for showing/hiding the color categories on the Theme panel
        toggleCategoryHidden(element) {
            element.classList.toggle("category-hidden");
            return true;
        },

        dataCustomHex(categoryName, propertyName) {

            return propertyName;
        },

        // Show a sub-page when its button is clicked
        setActiveSubpage(subpageTitle) {
            let subpageDivs = document.querySelectorAll("[data-sub-page='" + subpageTitle + "']");

            for (let i = 0; i < subpageDivs.length; i++) {
                subpageDivs[i].classList.add("sub-page-visible");
            }

            this.subpageIsActive = true;

            this.subpageHeader = subpageDivs[0].getAttribute("data-sub-page-title");
        },

        // Hide all active sub-pages
        hideActiveSubpage() {
            this.subpageIsActive = false;

            let subpageDivs = document.querySelectorAll(".sub-page-visible");

            for (let i = 0; i < subpageDivs.length; i++) {
                subpageDivs[i].classList.remove("sub-page-visible");
            }
        }
    }
});