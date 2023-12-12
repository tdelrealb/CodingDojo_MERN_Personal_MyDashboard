export const conditionals = (...classes) => {
	return classes.filter(Boolean).join(' ');
};
