import{_ as e,c as o,o as t,R as s}from"./chunks/framework.70e71619.js";const f=JSON.parse(`{"title":"Operations","description":"Operations are the individual actions in a flow. They enable you to do things like manage data within Directus, transform the flow's data, send information off to outside services, set conditional logic, trigger other flows, and beyond!","frontmatter":{"description":"Operations are the individual actions in a flow. They enable you to do things like manage data within Directus, transform the flow's data, send information off to outside services, set conditional logic, trigger other flows, and beyond!","readTime":"5 min read"},"headers":[],"relativePath":"app/flows/operations.md","lastUpdated":1682552691000}`),a={name:"app/flows/operations.md"},n=s(`<h1 id="operations" tabindex="-1">Operations <a class="header-anchor" href="#operations" aria-label="Permalink to &quot;Operations&quot;">​</a></h1><blockquote><p>Operations are the individual actions in a flow. They enable you to do things like manage data within Directus, transform the flow&#39;s data, send information off to outside services, set conditional logic, trigger other flows, <em>and beyond!</em></p></blockquote><div class="tip custom-block"><p class="custom-block-title">Before You Begin</p><p>On this page, we&#39;ll explain what each operation does, the value it appends to the data chain, how to make use of its configuration options, as well as any well as other relevant details. We will assume you have read the documentation on <a href="/configuration/flows.html">Flows</a> and <a href="/configuration/flows/triggers.html">Triggers</a>.</p></div><h2 id="condition" tabindex="-1">Condition <a class="header-anchor" href="#condition" aria-label="Permalink to &quot;Condition&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/condition-20220603A.webp" alt="Condition"></p><p>A <strong>Condition</strong> operation lets you choose a <strong>success path</strong> or <strong>failure path</strong> by validating data passed into it with <a href="/reference/filter-rules.html">Filter Rules</a>.</p><p><strong>Options</strong></p><ul><li><strong>Condition Rules</strong> — Create conditions with <a href="/reference/filter-rules.html">Filter Rules</a>.</li></ul><p><strong>Payload</strong></p><p>This operation does not generate data. If the filter rule is configured properly, it will append a <code>null</code> value on its <code>operationKey</code>, regardless of if the condition was met or not. However, if the filter rule is misconfigured, it will append an array containing an object you can use to help debug the misconfiguration.</p><p><strong>More Details</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>When using an <a href="/configuration/flows/triggers.html#event-hook">Event Hook</a> configured to be <strong>Action (Blocking)</strong>, if your flow ends with a condition that executes with a <code>reject</code> path, it will cancel your database transaction.</p></div><h2 id="run-script" tabindex="-1">Run Script <a class="header-anchor" href="#run-script" aria-label="Permalink to &quot;Run Script&quot;">​</a></h2><p>This operation lets you add a custom script using vanilla JavaScript or TypeScript. The script will be executed securely in an isolated sandbox. No interactions take place between the sandbox and the host except for sharing input and output values. This means, for example, no access to the file system and no ability to do network requests.</p><p><strong>Options</strong></p><p>The operation provides a default function template. The <em>optional</em> <code>data</code> parameter lets you pass in the data chain as an argument.</p><p><strong>Payload</strong></p><p>The function&#39;s <code>return</code> value will be appended under its <code>&lt;operationKey&gt;</code>.</p><p><strong>More Details</strong></p><p>As an example, let&#39;s say you have this function in a script operation, named <code>myScript</code>.</p><div class="language-JSON"><button title="Copy Code" class="copy"></button><span class="lang">JSON</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// A key from the data chain</span></span>
<span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">previousOperation</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>Then you add the following logic via Run Script.</p><div class="language-TypeScript"><button title="Copy Code" class="copy"></button><span class="lang">TypeScript</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// Your function in the myScript operation</span></span>
<span class="line"><span style="color:#89DDFF;">module.exports</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">data</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    timesTwo</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">data</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">previousOperation</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">*</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">2</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><p>The returned value will be appended under the <code>myScript</code> operation key.</p><div class="language-JSON"><button title="Copy Code" class="copy"></button><span class="lang">JSON</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">previousOperation</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">5</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C792EA;">myScript</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&quot;</span><span style="color:#FFCB6B;">timesTwo</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">10</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Make sure your <code>return</code> value is valid JSON.</p></div><div class="tip custom-block"><p class="custom-block-title">Throwing Errors</p><p>If you throw an error in a <strong>Run Script</strong> operation, it will immediately break your flow chain and stop execution of subsequent flows. If you used a <a href="/configuration/flows/triggers.html#event-hook">&quot;Blocking&quot; Event hook</a>, throwing an error will cancel the original event transaction to the database.</p></div><div class="tip custom-block"><p class="custom-block-title">Node Modules</p><p>For security reasons, module usage is disabled by default. You can configure what Node Modules are available through <a href="/self-hosted/config-options.html#security">the <code>FLOWS_EXEC_ALLOWED_MODULES</code> environment variable</a>.</p></div><h2 id="create-data" tabindex="-1">Create Data <a class="header-anchor" href="#create-data" aria-label="Permalink to &quot;Create Data&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/create-data-20220603A.webp" alt="Create Data"></p><p>This operation creates item(s) in a collection.</p><p><strong>Options</strong></p><ul><li><strong>Collection</strong> — Select the collection you&#39;d like to create items in.</li><li><strong>Permissions</strong> — Select the scope of permissions used for this operation.</li><li><strong>Emit Events</strong> — Toggle whether the event is emitted.</li><li><strong>Payload</strong> — Defines the payload to create item(s) in a collection.</li></ul><p><strong>Payload</strong></p><p>An array with the ID(s) of all items created will be appended under its <code>&lt;operationKey&gt;</code>.</p><p><strong>More Details</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><strong>Emit Events</strong> toggles the event&#39;s <em>visibility</em> throughout Directus. For example, if toggled on, this operation will trigger relevant event hooks in other flows or custom extensions. If toggled off, the operation will not trigger other event hooks. Imagine a situation where you have a flow being triggered by <code>&lt;collection&gt;.items.create</code> which contains an operation that then tries to create another item in that <code>&lt;collection&gt;</code>. This would throw an infinite loop where the operation triggers its own flow, endlessly. However, if you toggle <strong>Emit Events</strong> off, then this operation no longer triggers other event hooks.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>To learn about payload requirements when creating an item, see <a href="/reference/items.html">API Reference &gt; Items</a>.</p></div><h2 id="delete-data" tabindex="-1">Delete Data <a class="header-anchor" href="#delete-data" aria-label="Permalink to &quot;Delete Data&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/delete-data-20220603A.webp" alt="Delete Data"></p><p>This operation deletes item(s) from a collection.</p><p><strong>Options</strong></p><ul><li><strong>Collection</strong> — Select the collection you&#39;d like to delete items from.</li><li><strong>Permissions</strong> — Set the scope of permissions used for this operation.</li><li><strong>Emit Events</strong> — Toggle whether the event is emitted.</li><li><strong>IDs</strong> — Set Item IDs and press enter to confirm. Click the ID to remove.</li><li><strong>Query</strong> — Select items to delete with a query. To learn more, see <a href="/reference/filter-rules.html">Filter Rules</a>.</li></ul><p><strong>Payload</strong></p><p>An array with the ID(s) of all items deleted will be appended under its <code>&lt;operationKey&gt;</code>.</p><p><strong>More Details</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><strong>Emit Events</strong> toggles the event&#39;s <em>visibility</em> throughout Directus. For example, if togged on, this operation will trigger relevant event hooks in other flows or custom extensions. If toggled off, the operation will not trigger other event hooks. Imagine a situation where you have a flow being triggered by <code>&lt;collection&gt;.items.delete</code> which contains an operation that then tries to delete another item in that <code>&lt;collection&gt;</code>. This would throw an infinite loop where the operation triggers its own flow, endlessly. However, if you toggle <strong>Emit Events</strong> off, then this operation no longer triggers other event hooks.</p></div><h2 id="read-data" tabindex="-1">Read Data <a class="header-anchor" href="#read-data" aria-label="Permalink to &quot;Read Data&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/read-data-20220603A.webp" alt="Read Data"></p><p>This operation reads item(s) from a collection and adds them onto the data chain. You may select Items by their ID or by running a query.</p><p><strong>Options</strong></p><ul><li><strong>Permissions</strong> — Set the scope of permissions used for this operation.</li><li><strong>Collections</strong> — Select the collection you&#39;d like to read items from.</li><li><strong>IDs</strong> — Input the ID for items you wish to read and press enter. Click the ID to remove.</li><li><strong>Query</strong> — Select the items with a query. To learn more, see <a href="/reference/filter-rules.html">Filter Rules</a>.</li><li><strong>Emit Events</strong> — Toggle whether the event is emitted.</li></ul><p><strong>Payload</strong></p><p>An array containing all items read will be appended under its <code>&lt;operationKey&gt;</code>.</p><p><strong>More Details</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><strong>Emit Events</strong> toggles the event&#39;s <em>visibility</em> throughout Directus. For example, if togged on, this operation will trigger relevant event hooks in other flows or custom extensions. If toggled off, the operation will not trigger other event hooks. Imagine a situation where you have a flow being triggered by <code>&lt;collection&gt;.items.read</code> which contains an operation that then tries to read another item in that <code>&lt;collection&gt;</code>. This would throw an infinite loop where the operation triggers its own flow, endlessly. However, if you toggle <strong>Emit Events</strong> off, then this operation no longer triggers other event hooks.</p></div><h2 id="update-data" tabindex="-1">Update Data <a class="header-anchor" href="#update-data" aria-label="Permalink to &quot;Update Data&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/update-data-20220603A.webp" alt="Update Data"></p><p>This operation updates item(s) in a collection. You may select item(s) to update by their ID or by running a query.</p><p><strong>Options</strong></p><ul><li><strong>Collection</strong> — Select the collection on which you&#39;d like to update items in.</li><li><strong>Permissions</strong> — Set the role that this operation will inherit permissions from.</li><li><strong>Emit Events</strong> — Toggle whether the event is emitted.</li><li><strong>IDs</strong> — Input the ID for Item(s) you wish to read and press enter. Click the ID to remove.</li><li><strong>Payload</strong> — Update Items in a collection. To learn more, see <a href="/reference/items.html">API &gt; Items</a>.</li><li><strong>Query</strong> — Select items to update with a query. To learn more, see <a href="/reference/filter-rules.html">Filter Rules</a>.</li></ul><p><strong>Payload</strong></p><p>An array containing all items updated will be appended under its <code>&lt;operationKey&gt;</code>.</p><p><strong>More Details</strong></p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p><strong>Emit Events</strong> toggles the event&#39;s <em>visibility</em> throughout Directus. For example, if togged on, this operation will trigger relevant event hooks in other flows or custom extensions. If toggled off, the operation will not trigger other event hooks. Imagine a situation where you have a flow being triggered by <code>&lt;collection&gt;.items.update</code> which contains an operation that then tries to update another item in that <code>&lt;collection&gt;</code>. This would throw an infinite loop where the operation triggers its own flow, endlessly updating items. However, if you toggle <strong>Emit Events</strong> off, then this operation no longer triggers other event hooks.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>To learn about <code>payload</code> requirements when updating an item, see <a href="/reference/items.html">API Reference &gt; Items</a>.</p></div><h2 id="log-to-console" tabindex="-1">Log to Console <a class="header-anchor" href="#log-to-console" aria-label="Permalink to &quot;Log to Console&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/log-to-console-20220603A.webp" alt="Log to Console"></p><p>This operation outputs information to the server-side console as well as the <a href="/configuration/flows.html#logs">Logs</a> within the Data Studio. This is a key tool for troubleshooting flow configuration. A Log operation&#39;s key will have a null value on the data chain.</p><p><strong>Options</strong></p><ul><li><strong>Message</strong> — Sets a <a href="/configuration/flows.html#logs">log message</a>.</li></ul><p><strong>Payload</strong></p><p>This operation does not generate data for the data chain as its messages are for debugging and troubleshooting. It will append a <code>null</code> value on the <code>operationKey</code>.</p><p><strong>More Details</strong></p><p>For more details, see the section on <a href="/configuration/flows.html#logs">Logs</a>.</p><h2 id="send-email" tabindex="-1">Send Email <a class="header-anchor" href="#send-email" aria-label="Permalink to &quot;Send Email&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/send-email-20220603A.webp" alt="Send Email"></p><p>This operation sends off emails.</p><p><strong>Options</strong></p><ul><li><strong>To</strong> — Sets the email addresses. Hit <code>↵</code> <code>Enter</code> (PC) or <code>return</code> (Mac) to save the email. Click on a pill to remove it.</li><li><strong>Subject</strong> — Set the subject line.</li><li><strong>Body</strong> — Use a Markdown or WYSIWYG editor to create the email body.</li></ul><p><strong>Payload</strong></p><p>This operation does not generate data for the data chain. It will append a <code>null</code> value on the <code>operationKey</code>.</p><p><strong>More Details</strong></p><div class="tip custom-block"><p class="custom-block-title">Batch Emails</p><p>You can input an array of emails in the <code>To</code> input option to send off multiple emails.</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>If you are testing out this operation from <code>localhost:8080</code>, be sure to check your spam box, because your email provider may send it there automatically.</p></div><h2 id="send-notification" tabindex="-1">Send Notification <a class="header-anchor" href="#send-notification" aria-label="Permalink to &quot;Send Notification&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/send-notification-20220603A.webp" alt="Send Notification"></p><p>This operation pushes notifications to Directus Users. If the operation executes successfully, a list containing the IDs of all sent notifications generated is appended under this operation&#39;s key.</p><p><strong>Options</strong></p><ul><li><strong>Users</strong> — Define a user by their UUID. Hit <code>↵</code> <code>Enter</code> (PC) or <code>return</code> (Mac) to save it. Click on a pill to remove it.</li><li><strong>Permissions</strong> — Define the role that this operation will inherit permissions from.</li><li><strong>Title</strong> — Set the title of the notification.</li><li><strong>Message</strong> — Set the main body of the notification.</li></ul><p><strong>Payload</strong></p><p>This operation does not generate data. It will append a <code>null</code> value on its <code>operationKey</code>.</p><p><strong>More Details</strong></p><div class="tip custom-block"><p class="custom-block-title">Batch Notifications</p><p>You can input an array of UUIDs in the <code>To</code> input option to send off multiple emails.</p></div><h2 id="webhook-request-url" tabindex="-1">Webhook / Request URL <a class="header-anchor" href="#webhook-request-url" aria-label="Permalink to &quot;Webhook / Request URL&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/webhook-20220603A.webp" alt="Webhook / Request URL"></p><p>This operation makes a request to another URL.</p><p><strong>Options</strong></p><ul><li><strong>Method</strong> — Choose to make a GET, POST, PATCH, DELETE, or other type of request.</li><li><strong>URL</strong> — Define the URL to send the request to.</li><li><strong>Headers</strong> — Create a new <code>header:value</code> to pass along with the request.</li><li><strong>Request Body</strong> — Set the request body&#39;s data.</li></ul><p><strong>Payload</strong></p><p>When an operation completes successfully, the <code>response</code> is appended under its <code>&lt;operationKey</code>.</p><h2 id="sleep" tabindex="-1">Sleep <a class="header-anchor" href="#sleep" aria-label="Permalink to &quot;Sleep&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/sleep-20220603A.webp" alt="Sleep"></p><p>This operation creates a delay in the Flow for a given amount of milliseconds, then continues to the next operation.</p><p><strong>Options</strong></p><ul><li><strong>Milliseconds</strong> — Define the number of milliseconds to sleep.</li></ul><p><strong>Payload</strong></p><p>This operation does not generate data. It will append a <code>null</code> value on its <code>operationKey</code>.</p><h2 id="transform-payload" tabindex="-1">Transform Payload <a class="header-anchor" href="#transform-payload" aria-label="Permalink to &quot;Transform Payload&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/transform-payload-20220603A.webp" alt="Transform Payload"></p><p>This operation lets you custom define your own JSON payload for use in subsequent operations. This enables you to take multiple sources of data and &quot;tidy them up&quot; into a single payload.</p><p><strong>Options</strong></p><ul><li><strong>JSON</strong> — Define JSON to insert into the data chain.</li></ul><p><strong>Payload</strong></p><p>When an operation completes successfully, the value you defined under the <strong>JSON</strong> configuration operation is appended onto its <code>operationKey</code>.</p><p><strong>More Details</strong></p><p>When does the Transform Payload operation come in handy? Let&#39;s say you need to create a payload with data from a <code>users_collection</code>, <code>widgets_collection</code> and some 3rd party resource which processes the data. You can add a <a href="#read-data">Read Data</a> operation for <code>collection_a</code>, another Read Data operation for <code>collection_b</code>, and a <a href="#webhook--request-url">Webhook</a> operation for the third party resource.</p><p>Then you could stitch together all this data to create a new JSON object, like so:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">	&quot;note&quot;: &quot;You can add a hard-coded value!&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">	&quot;name&quot;: &quot;{{users_collection.username}}&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">	&quot;widget_id&quot;: &quot;{{widgets_collection.id}}&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">	&quot;results&quot;: &quot;{{webhookKey.subnestedValue}}&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="trigger-flow" tabindex="-1">Trigger Flow <a class="header-anchor" href="#trigger-flow" aria-label="Permalink to &quot;Trigger Flow&quot;">​</a></h2><p><img src="https://cdn.directus.io/docs/v9/configuration/flows/operations/operations-20220603A/trigger-flow-20220603A.webp" alt="Trigger Flow"></p><p>This operation starts another flow and <em>(optionally)</em> passes data into it. It should be used in combination with the <a href="/configuration/flows/triggers.html#another-flow">Another Flow</a> trigger.</p><p><strong>Options</strong></p><ul><li><strong>Flow</strong> — Define a flow by its primary key UUID.</li><li><strong>Payload</strong> — Defines a JSON <code>payload</code> to pass into <code>$trigger</code> on the flow it triggered.</li></ul><p><strong>Payload</strong></p><p>If you&#39;ve configured a <strong>Response Body</strong> in the trigger of the other flow, this will be appended under this <code>operationKey</code>. If no <strong>Response Body</strong> is configured, <code>null</code> is appended under this <code>operationKey</code>.</p><p><strong>More Details</strong></p><div class="tip custom-block"><p class="custom-block-title">Flows for-loops</p><p>If you pass an array to the other flow, the other flow will run once for each item in the array.</p></div>`,128),i=[n];function r(l,p,c,d,h,g){return t(),o("div",null,i)}const m=e(a,[["render",r]]);export{f as __pageData,m as default};
