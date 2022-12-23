function ConditionalWrapper({ condition, renderWrapper, children }) {
    return condition ? renderWrapper(children) : children;
}

export default ConditionalWrapper;
