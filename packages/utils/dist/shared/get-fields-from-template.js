export function getFieldsFromTemplate(template) {
    if (template === null)
        return [];
    const regex = /{{(.*?)}}/g;
    const fields = template.match(regex);
    if (!Array.isArray(fields)) {
        return [];
    }
    return fields.map((field) => {
        return field.replace(/{{/g, '').replace(/}}/g, '').trim();
    });
}
