import {useUserContext} from "../contexts/UserContext";

// Custom hook is used instead of simple function so it can have access
// to the user context
/**
 *
 * @param  {('ceo' | 'hr' | 'superior' | 'employee' | 'admin')} rest
 * Takes multiple role name parameters and compares it to the current logged user role name.
 */
export const useShowToRoles = (...rest) => {
	const {roleCode} = useUserContext();

	// Remove 'cd-' from the begining of the string to increase simplicity of use
	// when calling the function
	const role = roleCode?.replace("cd-", "");

	return rest.includes(role);
};
