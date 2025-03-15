export default defineNuxtRouteMiddleware(async (to, from) => {

  console.log('hello')
    if (import.meta.server) return;
    // Si pas de changement de route, ne fait rien
    if(from.name === to.name) return;
  
    const { loggedIn, fetch } = useUserSession();
    const excludedRoutes = HelperRouteAuthExcluded();
  
    // Récupère la session utilisateur avant toute décision
    await fetch();
    console.log('to.name',to.name)
    // Routes publiques pour les utilisateurs non connectés
    if (excludedRoutes.includes(to.name as string)) {
      if (loggedIn.value) {
        return navigateTo({name: 'home'});
      }
      return; // Permet l'accès si l'utilisateur n'est pas connecté
    }
    console.log('loggedIn.value',loggedIn.value)
    // Redirige les utilisateurs non connectés
    if (!loggedIn.value) {
      return navigateTo({name: 'auth-register	', query: {redirect: to.path}});
    }
  
    // Autorise l'accès si aucune condition spécifique n'est remplie
    return;
  });