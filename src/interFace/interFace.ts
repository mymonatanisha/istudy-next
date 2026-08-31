*** Begin Patch
*** Update File: src/interFace/interFace.ts
@@
-  buttonShow?: boolean;
-  buttonLink?: boolean;
-  dynamicLink?: boolean;
+  buttonShow?: boolean;
+  buttonLink?: boolean;
+  // prefer `dynamicLink`; keep runtime compatible with legacy `daynamicLink`
+  dynamicLink?: boolean;
+  daynamicLink?: boolean;
*** End Patch