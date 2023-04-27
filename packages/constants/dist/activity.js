export var Action;
(function (Action) {
    Action["CREATE"] = "create";
    Action["UPDATE"] = "update";
    Action["DELETE"] = "delete";
    Action["REVERT"] = "revert";
    Action["COMMENT"] = "comment";
    Action["UPLOAD"] = "upload";
    Action["LOGIN"] = "login";
    Action["RUN"] = "run";
})(Action || (Action = {}));
