import{_ as i,c as r,z as e,t as s,a as o,R as a,o as l}from"./chunks/framework.70e71619.js";const _=JSON.parse('{"title":"Building Content Approval Workflows","description":null,"frontmatter":{"description":null,"tags":[],"skill_level":null,"directus_version":"9.18.1","author_override":null,"author":"Eron Powell"},"headers":[],"relativePath":"guides/headless-cms/approval-workflows.md","lastUpdated":1682552691000}'),d={name:"guides/headless-cms/approval-workflows.md"},n=e("h1",{id:"building-content-approval-workflows",tabindex:"-1"},[o("Building Content Approval Workflows "),e("a",{class:"header-anchor",href:"#building-content-approval-workflows","aria-label":'Permalink to "Building Content Approval Workflows"'},"​")],-1),c=e("blockquote",null,[e("p",null,[o("Workflows are the use of custom access permissions to add structured stages to the flow of content creation or data generation. Workflows enable you to do things like pass off work in progress between multiple roles, build decision trees, "),e("em",null,"and beyond!")])],-1),u={class:"tip custom-block"},h={class:"custom-block-title"},p=e("strong",null,"Directus Version:",-1),f=a('<h2 id="explanation" tabindex="-1">Explanation <a class="header-anchor" href="#explanation" aria-label="Permalink to &quot;Explanation&quot;">​</a></h2><p>Remember, your basic <a href="/configuration/users-roles-permissions/permissions.html#configure-permissions">CRUDS permissions</a> define what a role can and can&#39;t do to all items in a collection. <a href="/configuration/users-roles-permissions/permissions.html#configure-custom-permissions">Custom access permissions</a> take things a step further and let you define what a role can and can&#39;t do to each item in a collection, <em>based on its <a href="/configuration/data-model/fields.html">field values</a></em>.</p><p>Workflows are when you use these permissions techniques to create structured stages to content or data creation. In simplest terms, it is when you have two or more roles, and you give them different permissions at each stage in the content creation process.</p><p>There are an infinite number of possible workflows you could configure. But for this recipe, we will configure a simple workflow where <code>writers</code> and <code>editors</code> work together to create, co-edit and publish <code>articles</code>.</p><p><img src="https://cdn.directus.io/docs/v9/configuration/users-roles-permissions/workflows-20220909/workflows-20220909B.webp" alt="A Workflow"></p><p>For this recipe, our workflow will have three stages, <code>draft</code>, <code>under review</code>, and <code>published</code>, which will be defined in a <code>status</code> field.</p><table><thead><tr><th><code>status</code></th><th><code>Author</code></th><th><code>Editor</code></th></tr></thead><tbody><tr><td><em>Article is not yet created</em></td><td>Author can create new items in <code>articles</code>, but only with a status of <code>draft</code>.</td><td>Editor cannot create new items in <code>articles</code>.</td></tr><tr><td><code>Draft</code></td><td>Author creates and edits the article. Then can set status to <code>under review</code> when ready.</td><td>Editor has either read-only, or no permissions at all.</td></tr><tr><td><code>Under Review</code></td><td>Author can edit the article&#39;s content, but not the <code>status</code> field.</td><td>Editor can edit the article, as well as set status to <code>Draft</code> or <code>Published</code>.</td></tr><tr><td><code>Published</code></td><td>Author is no longer responsible for article, and has read-only permissions.</td><td>Editor has permissions to update or delete the article.</td></tr></tbody></table><p>This whole workflow is created with permissions. All we need to do to create these stages is change the <code>author</code> and <code>editor</code> permissions for each item in <code>articles</code> conditionally, based on the value of <code>status</code>.</p><p><img src="https://cdn.directus.io/docs/v9/configuration/users-roles-permissions/workflows-20220909/workflows-20220909A.webp" alt="A Workflow"></p><h2 id="how-to-guide" tabindex="-1">How-To Guide <a class="header-anchor" href="#how-to-guide" aria-label="Permalink to &quot;How-To Guide&quot;">​</a></h2><div class="tip custom-block"><p class="custom-block-title">Requirements</p><p>To implement a workflow, you&#39;ll need:</p><ul><li>An understanding of <a href="/configuration/users-roles-permissions.html">permissions</a> and <a href="/reference/filter-rules.html">filters</a> in Directus.</li><li>A collection with some kind of content. In this recipe, we&#39;ll use a collection called <code>articles</code>.</li><li>A field on that collection to validate conditionally. We&#39;ll use a <code>status</code> field.</li><li>Two <em>(or more)</em> roles that will work to author content. We&#39;ll use <code>writer</code> and <code>editor</code> roles.</li></ul></div><p>To create a structured workflow for <code>articles</code>, follow these steps.</p><ol><li>First, <a href="/configuration/data-model/fields.html#create-a-field-standard">create a field</a> to track the article status. We&#39;ll call this field <code>status</code>, but it could be named anything.</li><li><a href="/configuration/data-model/fields.html#create-a-field-advanced">Create a field</a> with a Dropdown Interface. Name it <code>status</code> and add the stages <em>(<code>draft</code>, <code>under review</code> and <code>published</code>)</em> needed for your content creation process.</li><li>Next, <a href="/configuration/users-roles-permissions/roles.html#create-a-role">create two roles</a>: <code>author</code> and <code>editor</code>.</li><li>Finally, configure <a href="/configuration/users-roles-permissions/permissions.html#configure-custom-permissions">custom access permissions</a> for each role based on the value of the <code>status</code> field. <ul><li>For the <code>author</code> role: <ul><li>Set a filter under <strong>Create &gt; Use Custom &gt; Field Validation</strong> to ensure the author can only create articles with a <code>draft</code> status.</li><li>Enable all read permissions.</li><li>Set a filter under <strong>Update &gt; Use Custom &gt; Item Permissions</strong> to ensure the user can update articles with a <code>draft</code> or <code>under review</code> status.</li><li>Set a filter under <strong>Update &gt; Use Custom &gt; Field Validation</strong> to ensure the user can only update article status to <code>under review</code>.</li><li>Keep delete permissions restricted.</li><li>Keep shares permissions restricted.</li></ul></li><li>For the <code>editor</code> role: <ul><li>Keep create permissions restricted.</li><li>Enable all read permissions.</li><li>Set a filter under <strong>Update &gt; Use Custom &gt; Item Permissions</strong> to ensure the user can only update articles with an <code>under review</code> status.</li><li>Set a filter under <strong>Update &gt; Use Custom &gt; Field Validation</strong> to ensure the user can only update status to <code>published</code>.</li><li>Keep delete permissions restricted.</li><li>Keep shares permissions restricted.</li></ul></li></ul></li></ol><h2 id="final-tips" tabindex="-1">Final Tips <a class="header-anchor" href="#final-tips" aria-label="Permalink to &quot;Final Tips&quot;">​</a></h2><p>This recipe covers one simple example of a workflow. As you move forward and created your own custom-tailored workflows, just remember:</p><ul><li>You could use any number of roles.</li><li>You could use any collection or relationally linked collections.</li><li>You can add more stages in your workflow by adding more values to your <code>status</code> field.</li></ul><p>Be sure to pay close attention to how you configure custom access permissions for workflows. Unintentional misconfigurations can have side-effects.</p><p>In our simple <code>articles</code> workflow above, a minor misconfiguration in a co-editing workflow between two team members <em>might</em> not be a big problem. But in other cases it can have big consequences. For example, let&#39;s imagine for a second that:</p><ul><li>The <code>writer</code> and <code>editor</code> roles were <code>teacher</code> and <code>student</code> roles.</li><li>The <code>articles</code> collection was instead a <code>tests</code> collection.</li><li>The <code>status</code> field defined if the test was <code>not started</code>, <code>in progress</code>, or <code>submitted</code>.</li></ul><p>A minor misconfiguration here could ruin academic integrity. Here&#39;s a few potential issues:</p><ul><li>students retake/re-edit their own submitted test.</li><li>students take/edit/delete tests of other students.</li><li>teachers modify the results of students that they like or don&#39;t like.</li><li><em>and beyond!</em></li></ul><p>When creating your own workflow, its a good idea to define each role involved, each stage in the workflow, and the explicit set of permissions each role has at each stage.</p><div class="tip custom-block"><p class="custom-block-title">Next Steps</p><p>Workflows can be further enhanced with custom <a href="/extensions/interfaces.html">Interfaces</a> as well as <a href="/configuration/flows.html">flows</a>.</p></div>',23);function m(t,w,g,b,k,v){return l(),r("div",null,[n,c,e("div",u,[e("p",h,"Author: "+s(t.$frontmatter.author),1),e("p",null,[p,o(" "+s(t.$frontmatter.directus_version),1)])]),f])}const A=i(d,[["render",m]]);export{_ as __pageData,A as default};
