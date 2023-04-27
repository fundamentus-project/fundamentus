import { omit } from 'lodash-es';
export function constructFlowTree(flow) {
    const rootOperation = flow.operations.find((operation) => operation.id === flow.operation) ?? null;
    const operationTree = constructOperationTree(rootOperation, flow.operations);
    const flowTree = {
        ...omit(flow, 'operations'),
        operation: operationTree,
        options: flow.options ?? {},
    };
    return flowTree;
}
function constructOperationTree(root, operations) {
    if (root === null) {
        return null;
    }
    const resolveOperation = root.resolve !== null ? operations.find((operation) => operation.id === root.resolve) : null;
    const rejectOperation = root.reject !== null ? operations.find((operation) => operation.id === root.reject) : null;
    if (resolveOperation === undefined || rejectOperation === undefined) {
        throw new Error('Undefined reference in operations');
    }
    const operationTree = {
        ...omit(root, 'flow'),
        resolve: constructOperationTree(resolveOperation, operations),
        reject: constructOperationTree(rejectOperation, operations),
    };
    return operationTree;
}
