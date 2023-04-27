import{_ as r,c as i,o as a,R as s,z as e,a as t}from"./chunks/framework.70e71619.js";const B=JSON.parse('{"title":"User Directory","description":"The User Directory is the management system for all Users within a Project.","frontmatter":{"description":"The User Directory is the management system for all Users within a Project.","readTime":"7 min read"},"headers":[],"relativePath":"app/user-directory.md","lastUpdated":1682552691000}'),o={name:"app/user-directory.md"},n=s('<h1 id="user-directory" tabindex="-1">User Directory <a class="header-anchor" href="#user-directory" aria-label="Permalink to &quot;User Directory&quot;">​</a></h1><blockquote><p>The User Directory is the management system for all Users within a Project. <a href="/getting-started/glossary.html#users">Users</a> are the individual accounts for logging in to the App. Each User belongs to a <a href="/getting-started/glossary.html#roles">Role</a> which defines its <a href="/getting-started/glossary.html#permissions">Permissions</a>.</p></blockquote><p><img src="https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-directory-20220222A.webp" alt="User Directory Page"></p><h2 id="how-it-works" tabindex="-1">How it Works <a class="header-anchor" href="#how-it-works" aria-label="Permalink to &quot;How it Works&quot;">​</a></h2><p>This Module is a management system that enables one to view, invite, create, edit, and delete Users and User information. Users can be created directly in the app, or invited to join via email.</p><p>When a User is created, they must also be assigned a Role. This Role defines the User&#39;s data access permissions within Directus. In other words, it determines what a User can see and do inside the app.</p><p>The User Directory is composed of two pages: The User Directory Page and the User Details Page. It has all the same features and functionality as the <a href="/app/content/collections.html">Content Module</a> such as manual and automatic sorting, batch edit/delete/archive, import/export from files, etc.</p><h2 id="user-directory-page" tabindex="-1">User Directory Page <a class="header-anchor" href="#user-directory-page" aria-label="Permalink to &quot;User Directory Page&quot;">​</a></h2>',8),l=e("video",{title:"User Directory Options",autoplay:"",playsinline:"",muted:"",loop:"",controls:""},[e("source",{src:"https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-directory-options-20220222A.mp4"}),e("p",null,[t(" Your browser is not displaying the video for some reason. Here's a "),e("a",{href:"https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-directory-options-20220222A.mp4"},"link to the video"),t(" instead. ")])],-1),c=e("p",null,[t("The User Directory Page lists all Users in a Project, with a navigation that allows quick access to Users by Role. This page has the same functionality as the "),e("a",{href:"/app/content/collections.html"},"Collection Page"),t(".")],-1),d=e("ul",null,[e("li",null,[e("strong",null,"Select All"),t(" — Selects all Users currently in queue.")]),e("li",null,[e("strong",null,"Card Size"),t(" — Toggles size of User Displays.")]),e("li",null,[e("strong",null,"Sort Field"),t(" — Selects Field used to Users by.")]),e("li",null,[e("strong",null,"Sort Direction"),t(" — Toggles ascending & descending sort order.")]),e("li",null,[e("strong",null,"Search"),t(" — Enables classic type-based searching.")]),e("li",null,[e("strong",null,"Filter"),t(" — Enables advanced query-based search.")]),e("li",null,[e("span",{mi:"",btn:"",sec:""},"person_add"),t(" — "),e("a",{href:"/configuration/users-roles-permissions.html#inviting-a-user"},"Invite people"),t(" to become Users via email.")]),e("li",null,[e("span",{mi:"",btn:""},"add"),t(" — "),e("a",{href:"/configuration/users-roles-permissions.html#creating-a-user"},"Create User"),t(" manually.")])],-1),h=e("p",null,[e("em",null,"The following are only visible once Users are selected.")],-1),u=e("ul",null,[e("li",null,[e("span",{mi:"",btn:"",warn:""},"edit"),t(" — Opens a User Details page to apply a single edit across multiple Users.")]),e("li",null,[e("strong",null,[e("span",{mi:"",btn:"",dngr:""},"delete")]),t(" — Deletes one or more Users.")])],-1),p=e("h3",{id:"layout-options",tabindex:"-1"},[t("Layout Options "),e("a",{class:"header-anchor",href:"#layout-options","aria-label":'Permalink to "Layout Options"'},"​")],-1),g=e("p",null,[e("img",{src:"https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-directory-layout-options-20220222A.webp",alt:"User Directory Layout Options"})],-1),m=e("p",null,[t("The "),e("strong",null,"Sidebar > Layout Options"),t(),e("em",null,[t("(denoted by "),e("span",{mi:"",icon:""},"layers"),t(" when Sidebar is minimized)")]),t(" allows you to adjust how Users are displayed on the User Directory. To learn more, see "),e("a",{href:"/app/layouts.html"},"Layouts"),t(".")],-1),y=s('<h2 id="user-details-page" tabindex="-1">User Details Page <a class="header-anchor" href="#user-details-page" aria-label="Permalink to &quot;User Details Page&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-profile-20220222A.webp" alt="The User Page"></p><p>A User&#39;s profile page can be accessed from the User Directory or by clicking the User Menu at the bottom of the <a href="/app/overview.html#_1-module-bar">Module Bar</a>. The profile page has the same features and functionality as the <a href="/app/content/items.html">Item Page</a>. Administrators can add and customize Fields under <a href="/configuration/data-model.html">Settings &gt; Data Model &gt; Directus Users</a>, but the following are available by default.</p><ul><li><strong>First Name</strong> — The given name.</li><li><strong>Last Name</strong> — The family/surname.</li><li><strong>Email</strong> — A unique email address.</li><li><strong>Password</strong> — A hashed system password.</li><li><strong>Avatar</strong> — An image to represent the User.</li><li><strong>Location</strong> — The city, country, office, or branch name.</li><li><strong>Title</strong> — The professional staff title.</li><li><strong>Description</strong> — A free-form text description.</li><li><strong>Tags</strong> — Keywords for search-ability.</li></ul><h3 id="user-preferences" tabindex="-1">User Preferences <a class="header-anchor" href="#user-preferences" aria-label="Permalink to &quot;User Preferences&quot;">​</a></h3><p><img src="https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-preferences-20220222A.webp" alt="User Preferences"></p><ul><li><strong>Language</strong> — The preferred App language/locale.</li><li><strong>Theme</strong> — Light or Dark mode (or based on system preferences).</li><li><strong>Multi-Factor Authentication</strong> — Configuration for MFA.</li><li><strong>Email Notifications</strong> — Receive emails for notifications.</li></ul><h3 id="admin-options" tabindex="-1">Admin Options <a class="header-anchor" href="#admin-options" aria-label="Permalink to &quot;Admin Options&quot;">​</a></h3><p><img src="https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/admin-options-20220222A.webp" alt="Admin Options"></p><ul><li><strong>Status</strong> — Sets User status as Draft, Invited, Active, Suspended, Archived.</li><li><strong>Role</strong> — Defines the User&#39;s Role.</li><li><strong>Token</strong> — Allows generating a static User access token.</li><li><strong>Provider</strong> — <em>read-only:</em> SSO provider associated with User. See our built-in <a href="/self-hosted/sso.html">SSO options</a>.</li><li><strong>External Identifier</strong> — Displays external identifier generated by SSO provider.</li></ul><h3 id="read-only-info" tabindex="-1">Read-only Info <a class="header-anchor" href="#read-only-info" aria-label="Permalink to &quot;Read-only Info&quot;">​</a></h3><p><img src="https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/user-profile-sidebar-information-20220309A.webp" alt="User Profile Sidebar Information"></p>',12),f=e("p",null,[t("Information in the Sidebar "),e("em",null,[t("(denoted by "),e("span",{mi:"",icon:"",dark:""},"info"),t(" when Sidebar is minimized)")]),t(" also includes the following read-only details:")],-1),b=e("ul",null,[e("li",null,[e("strong",null,"User Key"),t(" — The Primary Key of the User.")]),e("li",null,[e("strong",null,"Last Page"),t(" — The last App page accessed by the User.")]),e("li",null,[e("strong",null,"Last Access"),t(" — The timestamp of the User's last App or API action.")])],-1),_=e("h2",{id:"view-a-user",tabindex:"-1"},[t("View a User "),e("a",{class:"header-anchor",href:"#view-a-user","aria-label":'Permalink to "View a User"'},"​")],-1),U=e("video",{autoplay:"",playsinline:"",muted:"",loop:"",controls:""},[e("source",{src:"https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/viewing-a-user-20220222A.mp4"}),e("p",null,[t(" Your browser is not displaying the video for some reason. Here's a "),e("a",{href:"https://cdn.directus.io/docs/v9/app-guide/user-directory/user-directory-20220222A/viewing-a-user-20220222A.mp4"},"link to the video"),t(" instead. ")])],-1),v=e("p",null,"Users are referenced throughout the app, often for accountability purposes. Hovering over a User in this context will provide a popover with basic information. Clicking that popover will navigate you to a view of that User's profile page.",-1),A=e("h2",{id:"create-a-user",tabindex:"-1"},[t("Create a User "),e("a",{class:"header-anchor",href:"#create-a-user","aria-label":'Permalink to "Create a User"'},"​")],-1),w=e("p",null,"To create a User, follow these steps:",-1),T=e("ol",null,[e("li",null,[t("Navigate to the "),e("strong",null,"User Library"),t(".")]),e("li",null,[t("Click "),e("span",{mi:"",btn:""},"add"),t(" in the page header.")]),e("li",null,[t("Enter an "),e("strong",null,"Email Address"),t(".")]),e("li",null,"Optional: Fill in the other User details as desired."),e("li",null,[t("Click "),e("span",{mi:"",btn:""},"check"),t(" to save the User.")])],-1),P=e("h2",{id:"invite-a-user",tabindex:"-1"},[t("Invite a User "),e("a",{class:"header-anchor",href:"#invite-a-user","aria-label":'Permalink to "Invite a User"'},"​")],-1),k=e("p",null,"To invite User(s) via email, follow these steps:",-1),D=e("ol",null,[e("li",null,[t("Navigate to the "),e("strong",null,"User Library"),t(".")]),e("li",null,[t("Click "),e("span",{mi:"",btn:"",sec:""},"person_add"),t(" in the page header.")]),e("li",null,[t("Enter one or more email addresses, separated by a comma and a space."),e("br"),e("em",null,"Tip: You can also add emails on a new line.")]),e("li",null,[t("Select the "),e("strong",null,"Role"),t(" you want to assign to the User(s).")]),e("li",null,[t("Click "),e("strong",null,"Invite"),t(".")])],-1),S=s('<p>After that, the invited User(s) will receive an email with a link to the App where they set a password and enable their account.</p><h2 id="edit-user-details" tabindex="-1">Edit User Details <a class="header-anchor" href="#edit-user-details" aria-label="Permalink to &quot;Edit User Details&quot;">​</a></h2><p>To edit User details, follow these steps:</p><ol><li>Navigate to the <strong>User Library</strong>.</li><li>Click on the User you wish to manage and the User Details Page will open.</li><li>Reset User details as desired.</li></ol><p>The User Detail is only editable by the current User and admins, and the following fields are only available to admins:</p><ul><li><strong>Status</strong> — Determines if an account is able to access the platform or not. Only the <code>active</code> state is able to authenticate, all others are simply descriptive inactive states. <ul><li><strong>Draft</strong> — An incomplete User; no App/API access.</li><li><strong>Invited</strong> — Has a pending invite to the project; no App/API access until accepted.</li><li><strong>Active</strong> — The only status that has proper access to the App and API.</li><li><strong>Suspended</strong> — A User that has been temporarily disabled; no App/API access.</li><li><strong>Archived</strong> — A soft-deleted User; no App/API access.</li></ul></li><li><strong>Role</strong> — The User&#39;s role determines their permissions and access.</li><li><strong>Token</strong> — A User&#39;s token is an alternate way to <a href="/reference/authentication.html">authenticate into the API</a> using a static string. When NULL, the token is disabled.</li></ul><h2 id="archive-a-user" tabindex="-1">Archive a User <a class="header-anchor" href="#archive-a-user" aria-label="Permalink to &quot;Archive a User&quot;">​</a></h2><p>To archive a User, follow these steps:</p>',8),I=e("ol",null,[e("li",null,[t("Navigate to the "),e("strong",null,"User Library"),t(".")]),e("li",null,"Click the User you with to archive to go to their User Detail page."),e("li",null,[t("Click on "),e("span",{mi:"",btn:"",warn:""},"archive"),t(" in the header.")]),e("li",null,[t("Confirm this decision by clicking "),e("strong",null,"Archive"),t(" in the dialog.")])],-1),q=e("div",{class:"warning custom-block"},[e("p",{class:"custom-block-title"},"Disables Access"),e("p",null,[t("Archiving is equivalent to a "),e("em",null,"soft-delete"),t(". These Users are unable to access the App or API.")])],-1),C=e("h2",{id:"delete-a-user",tabindex:"-1"},[t("Delete a User "),e("a",{class:"header-anchor",href:"#delete-a-user","aria-label":'Permalink to "Delete a User"'},"​")],-1),x=e("p",null,"To delete a User, follow these steps:",-1),L=e("ol",null,[e("li",null,[t("Navigate to the "),e("strong",null,"User Library"),t(".")]),e("li",null,"Select one or more Users you wish to delete."),e("li",null,[t("Click on "),e("span",{mi:"",btn:"",dngr:""},"delete"),t(" in the header.")]),e("li",null,[t("Confirm this decision by clicking "),e("strong",null,"Delete"),t(" in the dialog.")])],-1),N=e("div",{class:"danger custom-block"},[e("p",{class:"custom-block-title"},"Irreversible Change"),e("p",null,[t("This action is permanent and can not be undone. Please proceed with caution. If you wish to soft-delete Users, see "),e("a",{href:"#archive-a-user"},"Archive a User"),t(".")])],-1),R=[n,l,c,d,h,u,p,g,m,y,f,b,_,U,v,A,w,T,P,k,D,S,I,q,C,x,L,N];function E(O,V,F,j,M,z){return a(),i("div",null,R)}const W=r(o,[["render",E]]);export{B as __pageData,W as default};