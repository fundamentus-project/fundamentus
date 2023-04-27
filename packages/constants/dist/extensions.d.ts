import { z } from 'zod';
export declare const APP_SHARED_DEPS: string[];
export declare const API_SHARED_DEPS: string[];
export declare const APP_EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel"];
export declare const API_EXTENSION_TYPES: readonly ["hook", "endpoint"];
export declare const HYBRID_EXTENSION_TYPES: readonly ["operation"];
export declare const BUNDLE_EXTENSION_TYPES: readonly ["bundle"];
export declare const EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "hook", "endpoint", "operation", "bundle"];
export declare const NESTED_EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "hook", "endpoint", "operation"];
export declare const APP_OR_HYBRID_EXTENSION_TYPES: readonly ["interface", "display", "layout", "module", "panel", "operation"];
export declare const APP_OR_HYBRID_EXTENSION_PACKAGE_TYPES: readonly ["interface", "display", "layout", "module", "panel", "operation", "bundle"];
export declare const EXTENSION_LANGUAGES: readonly ["javascript", "typescript"];
export declare const EXTENSION_NAME_REGEX: RegExp;
export declare const EXTENSION_PKG_KEY = "directus:extension";
export declare const SplitEntrypoint: z.ZodObject<{
    app: z.ZodString;
    api: z.ZodString;
}, "strip", z.ZodTypeAny, {
    app: string;
    api: string;
}, {
    app: string;
    api: string;
}>;
export declare const ExtensionOptionsBundleEntry: z.ZodUnion<[z.ZodObject<{
    type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
    name: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    name: string;
    source: string;
}, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    name: string;
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    name: z.ZodString;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}>]>;
export declare const ExtensionOptionsBase: z.ZodObject<{
    host: z.ZodString;
    hidden: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    host: string;
    hidden?: boolean | undefined;
}, {
    host: string;
    hidden?: boolean | undefined;
}>;
export declare const ExtensionOptionsAppOrApi: z.ZodObject<{
    type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
    path: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    source: string;
}, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    source: string;
}>;
export declare const ExtensionOptionsHybrid: z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
}, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
}>;
export declare const ExtensionOptionsBundle: z.ZodObject<{
    type: z.ZodLiteral<"bundle">;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    entries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
        name: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    }, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["operation"]>;
        name: z.ZodString;
        source: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    entries: ({
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    type: "bundle";
}, {
    path: {
        app: string;
        api: string;
    };
    entries: ({
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    type: "bundle";
}>;
export declare const ExtensionOptionsBundleEntries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
    type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
    name: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    name: string;
    source: string;
}, {
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    name: string;
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    name: z.ZodString;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
}, "strip", z.ZodTypeAny, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}, {
    type: "operation";
    name: string;
    source: {
        app: string;
        api: string;
    };
}>]>, "many">;
export declare const ExtensionOptions: z.ZodIntersection<z.ZodObject<{
    host: z.ZodString;
    hidden: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    host: string;
    hidden?: boolean | undefined;
}, {
    host: string;
    hidden?: boolean | undefined;
}>, z.ZodUnion<[z.ZodObject<{
    type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
    path: z.ZodString;
    source: z.ZodString;
}, "strip", z.ZodTypeAny, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    source: string;
}, {
    path: string;
    type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
    source: string;
}>, z.ZodObject<{
    type: z.ZodEnum<["operation"]>;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    source: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
}, {
    path: {
        app: string;
        api: string;
    };
    type: "operation";
    source: {
        app: string;
        api: string;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<"bundle">;
    path: z.ZodObject<{
        app: z.ZodString;
        api: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        app: string;
        api: string;
    }, {
        app: string;
        api: string;
    }>;
    entries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
        type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
        name: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    }, {
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["operation"]>;
        name: z.ZodString;
        source: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }, {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    path: {
        app: string;
        api: string;
    };
    entries: ({
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    type: "bundle";
}, {
    path: {
        app: string;
        api: string;
    };
    entries: ({
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        name: string;
        source: string;
    } | {
        type: "operation";
        name: string;
        source: {
            app: string;
            api: string;
        };
    })[];
    type: "bundle";
}>]>>;
export declare const ExtensionManifest: z.ZodObject<{
    name: z.ZodString;
    version: z.ZodString;
    dependencies: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
    "directus:extension": z.ZodIntersection<z.ZodObject<{
        host: z.ZodString;
        hidden: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        host: string;
        hidden?: boolean | undefined;
    }, {
        host: string;
        hidden?: boolean | undefined;
    }>, z.ZodUnion<[z.ZodObject<{
        type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
        path: z.ZodString;
        source: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        source: string;
    }, {
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        source: string;
    }>, z.ZodObject<{
        type: z.ZodEnum<["operation"]>;
        path: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
        source: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
    }, {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
    }>, z.ZodObject<{
        type: z.ZodLiteral<"bundle">;
        path: z.ZodObject<{
            app: z.ZodString;
            api: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            app: string;
            api: string;
        }, {
            app: string;
            api: string;
        }>;
        entries: z.ZodArray<z.ZodUnion<[z.ZodObject<{
            type: z.ZodUnion<[z.ZodEnum<["interface", "display", "layout", "module", "panel"]>, z.ZodEnum<["hook", "endpoint"]>]>;
            name: z.ZodString;
            source: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
            name: string;
            source: string;
        }, {
            type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
            name: string;
            source: string;
        }>, z.ZodObject<{
            type: z.ZodEnum<["operation"]>;
            name: z.ZodString;
            source: z.ZodObject<{
                app: z.ZodString;
                api: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                app: string;
                api: string;
            }, {
                app: string;
                api: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        }, {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        path: {
            app: string;
            api: string;
        };
        entries: ({
            type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        type: "bundle";
    }, {
        path: {
            app: string;
            api: string;
        };
        entries: ({
            type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        type: "bundle";
    }>]>>;
}, "strip", z.ZodTypeAny, {
    "directus:extension": ({
        host: string;
        hidden?: boolean | undefined;
    } & {
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        source: string;
    }) | ({
        host: string;
        hidden?: boolean | undefined;
    } & {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
    }) | ({
        host: string;
        hidden?: boolean | undefined;
    } & {
        path: {
            app: string;
            api: string;
        };
        entries: ({
            type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        type: "bundle";
    });
    name: string;
    version: string;
    dependencies?: Record<string, string> | undefined;
}, {
    "directus:extension": ({
        host: string;
        hidden?: boolean | undefined;
    } & {
        path: string;
        type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
        source: string;
    }) | ({
        host: string;
        hidden?: boolean | undefined;
    } & {
        path: {
            app: string;
            api: string;
        };
        type: "operation";
        source: {
            app: string;
            api: string;
        };
    }) | ({
        host: string;
        hidden?: boolean | undefined;
    } & {
        path: {
            app: string;
            api: string;
        };
        entries: ({
            type: "interface" | "display" | "layout" | "module" | "panel" | "hook" | "endpoint";
            name: string;
            source: string;
        } | {
            type: "operation";
            name: string;
            source: {
                app: string;
                api: string;
            };
        })[];
        type: "bundle";
    });
    name: string;
    version: string;
    dependencies?: Record<string, string> | undefined;
}>;
