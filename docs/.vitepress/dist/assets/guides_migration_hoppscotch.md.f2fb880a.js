import{_ as s,c as r,z as e,t as o,a,R as i,o as c}from"./chunks/framework.70e71619.js";const _=JSON.parse('{"title":"Migrate Your Data Model with Hoppscotch","description":"Learn how to migrate your data model to a new Directus project using Hoppscotch.","frontmatter":{"description":"Learn how to migrate your data model to a new Directus project using Hoppscotch.","tags":[],"skill_level":null,"directus_version":"9.23.0","author_override":null,"author":"Kevin Lewis"},"headers":[],"relativePath":"guides/migration/hoppscotch.md","lastUpdated":1682552691000}'),n={name:"guides/migration/hoppscotch.md"},d=e("h1",{id:"migrate-your-data-model-with-hoppscotch",tabindex:"-1"},[a("Migrate Your Data Model with Hoppscotch "),e("a",{class:"header-anchor",href:"#migrate-your-data-model-with-hoppscotch","aria-label":'Permalink to "Migrate Your Data Model with Hoppscotch"'},"​")],-1),h={class:"tip custom-block"},l={class:"custom-block-title"},p=e("strong",null,"Directus Version:",-1),u=i('<h2 id="explanation" tabindex="-1">Explanation <a class="header-anchor" href="#explanation" aria-label="Permalink to &quot;Explanation&quot;">​</a></h2><p>Directus&#39; schema migration endpoints allow users to retrieve a project&#39;s data model and apply changes to another project.</p><p>This is useful if you make changes to a data model in a development project and need to apply them to a production project, or to move from a self-hosted project to Directus Cloud.</p><p><a href="https://hoppscotch.io/" target="_blank" rel="noreferrer">Hoppscotch</a> is an open source API explorer. It is used in this recipe to make requests to your Directus project&#39;s API without writing code.</p><h2 id="how-to-guide" tabindex="-1">How-To Guide <a class="header-anchor" href="#how-to-guide" aria-label="Permalink to &quot;How-To Guide&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">Permissions</p><p>You must be an admin user to use these endpoints and follow this guide.</p></div><p>You should have two Directus projects - this guide will refer to them as the &quot;source&quot; and the &quot;target&quot;. Before starting, make sure you have a static access token for both projects.</p><h3 id="retrieve-data-model-snapshot-from-source-project" tabindex="-1">Retrieve Data Model Snapshot From Source Project <a class="header-anchor" href="#retrieve-data-model-snapshot-from-source-project" aria-label="Permalink to &quot;Retrieve Data Model Snapshot From Source Project&quot;">​</a></h3><p><img src="https://cdn.directus.io/docs/v9/cookbook/migration-hoppscotch/snapshot.webp" alt="Screenshot of Hoppscotch annotated with numbers associated with the below points."></p><ol><li>Make sure <code>GET</code> is selected in the method dropdown.</li><li>In the URL field, enter your source Directus project URL followed by <code>/schema/snapshot</code>.</li><li>In the Parameters tab, set a query parameter called <code>access_token</code> with the access token for your source project.</li><li>Click the <strong>Send</strong> button to send the request.</li><li>Copy the JSON response with your data model snapshot.</li></ol><h3 id="retrieve-data-model-diff" tabindex="-1">Retrieve Data Model Diff <a class="header-anchor" href="#retrieve-data-model-diff" aria-label="Permalink to &quot;Retrieve Data Model Diff&quot;">​</a></h3><p><img src="https://cdn.directus.io/docs/v9/cookbook/migration-hoppscotch/diff.webp" alt="Screenshot of Hoppscotch annotated with numbers associated with the below points."></p><p>This section will create a &quot;diff&quot; that describes all differences between your source and target project&#39;s data models.</p><ol><li>Make sure <code>POST</code> is selected in the method dropdown.</li><li>In the URL field, enter your target Directus project URL followed by <code>/schema/diff</code>.</li><li>In the Parameters tab, set a query parameter called <code>access_token</code> with the access token for your target project.</li><li>In the Body tab, set the Content Type to <code>application/json</code> and paste the JSON response from the snapshot. You must only paste the contents of the <code>data</code> property.</li><li>Click the <strong>Send</strong> button to send the request.</li><li>Copy the JSON response with your data model diff.</li></ol><h3 id="apply-diff-to-target-project" tabindex="-1">Apply Diff To Target Project <a class="header-anchor" href="#apply-diff-to-target-project" aria-label="Permalink to &quot;Apply Diff To Target Project&quot;">​</a></h3><p><img src="https://cdn.directus.io/docs/v9/cookbook/migration-hoppscotch/apply.webp" alt="Screenshot of Hoppscotch annotated with numbers associated with the below points."></p><ol><li>Make sure <code>POST</code> is selected in the method dropdown.</li><li>In the URL field, enter your target Directus project URL followed by <code>/schema/apply</code>.</li><li>In the Parameters tab, set a query parameter called <code>access_token</code> with the access token for your source project.</li><li>In the Body tab, set the Content Type to <code>application/json</code> and paste the JSON response from the diff. You must only paste the contents of the <code>data</code> property.</li><li>Click the <strong>Send</strong> button to send the request.</li><li>Note the response status of 204 - which indicates a successful data model migration.</li></ol><h2 id="final-tips" tabindex="-1">Final Tips <a class="header-anchor" href="#final-tips" aria-label="Permalink to &quot;Final Tips&quot;">​</a></h2><p>The diff endpoint does not allow different Directus versions and database vendors by default. This is to avoid any unintentional diffs from being generated. You can opt in to bypass these checks by adding a second query parameter called <code>force</code> with the value of <code>true</code>.</p><p>The hash property in the diff is based on the target instance&#39;s schema and version. It is used to safeguard against changes that may happen after the current diff was generated which can potentially incur unexpected side effects when applying the diffs without this safeguard. In case the schema has been changed in the meantime, the diff must be regenerated.</p>',20);function f(t,m,g,b,w,y){return c(),r("div",null,[d,e("blockquote",null,[e("p",null,o(t.$frontmatter.description),1)]),e("div",h,[e("p",l,"Author: "+o(t.$frontmatter.author),1),e("p",null,[p,a(" "+o(t.$frontmatter.directus_version),1)])]),u])}const v=s(n,[["render",f]]);export{_ as __pageData,v as default};
