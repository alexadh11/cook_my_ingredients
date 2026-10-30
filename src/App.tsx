import React, { useState, useEffect } from "react";
import { 
  ChefHat, 
  Search, 
  BookOpen, 
  Sparkles, 
  Trophy, 
  HelpCircle, 
  PlusCircle, 
  Bookmark, 
  Info, 
  Phone, 
  Mail, 
  Lock, 
  User, 
  Globe, 
  Scale, 
  ChevronRight, 
  Check, 
  RotateCcw, 
  X, 
  Share2, 
  AlertCircle, 
  Heart,
  Send,
  Loader2,
  Clock,
  MapPin,
  Flame,
  UtensilsCrossed,
  Sliders,
  Award,
  CheckCircle,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { INGREDIENTS, RECIPES, TIPS, CONTESTS, Recipe, Ingredient, Tip, getRecipeRegion, getRecipeCourse } from "./data";

export default function App() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<string>("matcher");
  
  // Ingredient states
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [ingredientSearch, setIngredientSearch] = useState<string>("");
  
  // Recipe states
  const [matchingRecipes, setMatchingRecipes] = useState<Recipe[]>(RECIPES);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [servingCount, setServingCount] = useState<number>(4);
  const [activeRegionFilter, setActiveRegionFilter] = useState<string>("All");
  const [activeCourseFilter, setActiveCourseFilter] = useState<string>("All");
  
  // Bookmarks
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("cmi_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  // Custom user-submitted recipes
  const [customRecipes, setCustomRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem("cmi_custom_recipes");
    return saved ? JSON.parse(saved) : [];
  });

  // CMI AI Assistant States
  const [aiInput, setAiInput] = useState<string>("");
  const [aiChat, setAiChat] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { 
      sender: "bot", 
      text: "### Welcome to CMI AI! 🍳\nI am your custom cooking assistant. Tell me what's in your pantry, ask for ingredient substitutions, or get a quick cooking hack. Try asking me:\n\n- 'How do I replace sour yogurt in a curry?'\n- 'Give me a creative recipe with chicken, potatoes, and spinach.'\n- 'What is the secret to perfect crispy fried Hilsa fish?'" 
    }
  ]);
  const [aiLoading, setAiLoading] = useState<boolean>(false);

  // Decider Tool States
  const [deciderResult, setDeciderResult] = useState<Recipe | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);

  // Authentication states
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userProfile, setUserProfile] = useState<{ name: string; email?: string; phone?: string } | null>(() => {
    const saved = localStorage.getItem("cmi_user");
    return saved ? JSON.parse(saved) : null;
  });
  
  // Auth Form State
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    countryCode: "+880",
    otp: ""
  });
  const [smsSent, setSmsSent] = useState<boolean>(false);

  // New Recipe Form State
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [newRecipeForm, setNewRecipeForm] = useState({
    name: "",
    cuisine: "Traditional / South Asian",
    category: "Main Courses" as any,
    prepTime: 15,
    cookTime: 20,
    baseServings: 4,
    requiredIngredients: [] as string[],
    ingredientsText: "",
    stepsText: "",
    story: "",
    difficulty: "Medium" as any
  });

  // Tip Modal State
  const [activeTipModal, setActiveTipModal] = useState<Tip | null>(null);

  // Interactive Checklist states for active cooking session
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  // Reset cooking companion checklist when recipe changes
  useEffect(() => {
    setCheckedIngredients([]);
    setCheckedSteps([]);
  }, [selectedRecipe]);

  // Contest Entry Simulator State
  const [showContestModal, setShowContestModal] = useState<any | null>(null);
  const [contestEntryForm, setContestEntryForm] = useState({
    recipeName: "",
    story: "",
    agreeToTerms: false
  });
  const [contestSuccessMessage, setContestSuccessMessage] = useState<string | null>(null);

  // Current UTC and local time display
  const [time, setTime] = useState<string>(new Date().toISOString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toISOString());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update bookmarks persisted state
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("cmi_bookmarks_" + userProfile.name, JSON.stringify(bookmarks));
      localStorage.setItem("cmi_bookmarks", JSON.stringify(bookmarks));
    }
  }, [bookmarks, userProfile]);

  // Load user-specific bookmarks when user profile changes
  useEffect(() => {
    if (userProfile) {
      const saved = localStorage.getItem("cmi_bookmarks_" + userProfile.name) || localStorage.getItem("cmi_bookmarks");
      setBookmarks(saved ? JSON.parse(saved) : []);
    } else {
      setBookmarks([]);
    }
  }, [userProfile]);

  // Update custom recipes persisted state
  useEffect(() => {
    localStorage.setItem("cmi_custom_recipes", JSON.stringify(customRecipes));
  }, [customRecipes]);

  // Sync / Match Recipes when selected ingredients or filters change
  useEffect(() => {
    const allAvailableRecipes = [...RECIPES, ...customRecipes];
    
    // Filter by ingredients first
    let filtered = allAvailableRecipes;
    if (selectedIngredients.length > 0) {
      filtered = allAvailableRecipes.filter(recipe => {
        // Must contain AT LEAST ONE of the selected ingredients (lenient match for fridge discovery!)
        return recipe.requiredIngredients.some(ing => selectedIngredients.includes(ing));
      });
    }

    // Filter by Region (Cuisine Hub)
    if (activeRegionFilter !== "All") {
      filtered = filtered.filter(r => getRecipeRegion(r) === activeRegionFilter);
    }

    // Filter by Course
    if (activeCourseFilter !== "All") {
      filtered = filtered.filter(r => getRecipeCourse(r) === activeCourseFilter);
    }

    setMatchingRecipes(filtered);
  }, [selectedIngredients, activeRegionFilter, activeCourseFilter, customRecipes]);

  // Handle ingredient pick
  const toggleIngredient = (id: string) => {
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== id));
    } else {
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const clearSelectedIngredients = () => {
    setSelectedIngredients([]);
  };

  // Toggle bookmark
  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userProfile) {
      setAuthMode("register");
      setShowAuthModal(true);
      return;
    }
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Send message to CMI AI Route
  const sendAiMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiChat(prev => [...prev, { sender: "user", text: userMsg }]);
    setAiInput("");
    setAiLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with CMI AI server.");
      }

      const data = await response.json();
      setAiChat(prev => [...prev, { sender: "bot", text: data.text }]);
    } catch (error: any) {
      console.error(error);
      setAiChat(prev => [
        ...prev, 
        { 
          sender: "bot", 
          text: `### Connection Notice\nI encountered a connection issue. However, you can still ask me about South Asian staples! Since we are offline, here's a handy Tip: \n\nTo store spices perfectly: Keep ginger-garlic paste frozen in small ice cube trays. Pop one out whenever you are preparing a quick traditional curry!` 
        }
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  // Decider spin simulation
  const runDecider = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setDeciderResult(null);

    let count = 0;
    const interval = setInterval(() => {
      const tempIndex = Math.floor(Math.random() * RECIPES.length);
      setDeciderResult(RECIPES[tempIndex]);
      count++;
      if (count > 10) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 150);
  };

  // Simulated Login Handler
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "register") {
      const newUser = {
        name: authForm.name || "Home Cook",
        email: authForm.email || undefined,
        phone: authForm.phone ? `${authForm.countryCode} ${authForm.phone}` : undefined
      };
      setUserProfile(newUser);
      localStorage.setItem("cmi_user", JSON.stringify(newUser));
    } else {
      const defaultUser = {
        name: "Adhikary Alex",
        email: authForm.email || "adhikaryalex@gmail.com"
      };
      setUserProfile(defaultUser);
      localStorage.setItem("cmi_user", JSON.stringify(defaultUser));
    }
    setShowAuthModal(false);
    setSmsSent(false);
  };

  // Sign out
  const handleSignOut = () => {
    setUserProfile(null);
    setBookmarks([]);
    localStorage.removeItem("cmi_user");
  };

  // Submit Recipe Draft Handler
  const handleRecipeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeForm.name || newRecipeForm.requiredIngredients.length === 0) {
      alert("Please provide a recipe name and select at least one core ingredient.");
      return;
    }

    // Parse ingredientsText (split by comma or newline)
    const ingredientsArray = newRecipeForm.ingredientsText
      .split(/[\n,]/)
      .filter(item => item.trim() !== "")
      .map(item => {
        // Extract numbers and text
        const match = item.match(/^([\d.]+)?\s*([a-zA-Z]+)?\s+(.+)$/);
        return {
          name: match ? match[3] : item,
          baseAmount: match && match[1] ? parseFloat(match[1]) : 1,
          unit: match && match[2] ? match[2] : "unit"
        };
      });

    const stepsArray = newRecipeForm.stepsText
      .split("\n")
      .filter(step => step.trim() !== "");

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      name: newRecipeForm.name,
      cuisine: newRecipeForm.cuisine,
      category: newRecipeForm.category,
      prepTime: Number(newRecipeForm.prepTime),
      cookTime: Number(newRecipeForm.cookTime),
      baseServings: Number(newRecipeForm.baseServings),
      requiredIngredients: newRecipeForm.requiredIngredients,
      ingredients: ingredientsArray.length > 0 ? ingredientsArray : [{ name: "Ingredient list details", baseAmount: 1, unit: "unit" }],
      steps: stepsArray.length > 0 ? stepsArray : ["Follow custom kitchen guidelines."],
      story: newRecipeForm.story || "A recipe crafted and submitted to the CMI community.",
      difficulty: newRecipeForm.difficulty,
      author: userProfile?.name || "Anonymous Chef"
    };

    setCustomRecipes([...customRecipes, newRecipe]);
    setShowSubmitModal(false);
    
    // Reset form
    setNewRecipeForm({
      name: "",
      cuisine: "Traditional / South Asian",
      category: "Curry",
      prepTime: 15,
      cookTime: 20,
      baseServings: 4,
      requiredIngredients: [],
      ingredientsText: "",
      stepsText: "",
      story: "",
      difficulty: "Medium"
    });

    // Go to matching recipes tab
    setActiveTab("matcher");
  };

  // Handle Contest Entry submission
  const handleContestEntry = (e: React.FormEvent) => {
    e.preventDefault();
    setContestSuccessMessage(`Draft entry for "${contestEntryForm.recipeName}" saved! In Phase 2, this will be uploaded to Firebase Auth and live database voting.`);
    setTimeout(() => {
      setContestSuccessMessage(null);
      setShowContestModal(null);
    }, 4000);
  };

  // Helper categorized ingredients
  const categories = ["Proteins", "Vegetables", "Pantry & Grains", "Spices & Herbs", "Oils"] as const;

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 bg-[#FAF9F5]">
      
      {/* Premium Modern Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-stone-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Dynamic UTC clock */}
          <div className="flex items-center gap-3">
            <div className="bg-[#C24134] p-2.5 rounded-2xl shadow-md shadow-rose-900/10 flex items-center justify-center border border-rose-500/10">
              <ChefHat className="w-6.5 h-6.5 text-[#FAF9F5]" />
            </div>
            <div>
              <h1 className="text-xl font-display font-black tracking-wider text-stone-900">
                COOK MY INGREDIENTS
              </h1>
            </div>
          </div>

          {/* Center search simulation */}
          <div className="relative flex-1 max-w-md mx-auto md:mx-0">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-stone-400" />
            </span>
            <input
              type="text"
              placeholder="Search ingredients or quick tips..."
              value={ingredientSearch}
              onChange={(e) => setIngredientSearch(e.target.value)}
              className="w-full bg-stone-50 text-stone-800 pl-10 pr-10 py-2.5 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-[#C24134] focus:bg-white transition-all shadow-xs"
            />
            {ingredientSearch && (
              <button 
                onClick={() => setIngredientSearch("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Authentication State */}
          <div className="flex items-center justify-end gap-3 text-sm">
            {userProfile ? (
              <div className="flex items-center gap-2.5 bg-stone-50 px-3.5 py-1.5 rounded-xl border border-stone-200">
                <div className="w-7 h-7 bg-amber-500 text-amber-950 font-bold rounded-full flex items-center justify-center font-display text-xs shadow-sm">
                  {userProfile.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-stone-800 leading-none">{userProfile.name}</p>
                  <p className="text-[9px] text-stone-400 font-mono mt-0.5">Gold Member</p>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="text-[11px] text-stone-400 hover:text-rose-600 transition-colors ml-2 font-mono underline"
                >
                  Exit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
                  className="px-3.5 py-2 text-xs font-bold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => { setAuthMode("register"); setShowAuthModal(true); }}
                  className="bg-[#C24134] hover:bg-[#A83227] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Global Navigation Tabs (Glassy style) */}
        <div className="bg-[#FAF8F5] border-t border-stone-200/50">
          <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto whitespace-nowrap scrollbar-none">
            {[
              { id: "matcher", label: "🍳 Recipe Matcher", desc: "Digital Pantry" },
              { id: "ai", label: "🤖 CMI AI Assistant", desc: "Cookbook AI" },
              { id: "tips", label: "💡 Tips", desc: "Hacks & storage" },
              { id: "decider", label: "🎯 Decider Wheel", desc: "Random choice" },
              { id: "contests", label: "🏆 Cooking Contests", desc: "Fun challenges" },
              { id: "submit", label: "📝 Submit Recipe", desc: "Share & earn" },
              { id: "bookmarks", label: "🔖 Bookmarks", desc: "Saved dishes" },
              { id: "policy", label: "📋 Legal & About", desc: "Trust & Rules" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedRecipe(null);
                }}
                className={`flex flex-col py-3 px-5 text-left border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "border-[#C24134] text-stone-900 bg-white"
                    : "border-transparent text-stone-400 hover:text-stone-700 hover:bg-stone-50"
                }`}
              >
                <span className={`text-xs font-bold ${activeTab === tab.id ? "text-stone-900" : "text-stone-500"}`}>{tab.label}</span>
                <span className="text-[8px] text-stone-400 font-mono uppercase tracking-wider mt-0.5">{tab.desc}</span>
              </button>
            ))}
          </div>
        </div>

      </header>

      {/* Main Body Grid */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-6">
        
        {/* Banner Announcement for Organic growth */}
        <div className="mb-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-6 shadow-md border border-stone-800 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 top-0 w-32 h-32 bg-[#C24134]/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-1.5">
              <span className="bg-[#C24134] text-white text-[9px] font-bold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider inline-block">
                ★ Phase 1: Launch Edition
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-black tracking-tight text-white leading-tight">
                Sift your Pantry. Cook Delicious Meals.
              </h2>
              <p className="text-xs text-stone-300 max-w-xl leading-relaxed">
                Toggle the items in your pantry shelves below. Our database will instantly reveal matching traditional or global recipes with mathematically perfect portions resizing!
              </p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <button 
                onClick={() => setActiveTab("ai")}
                className="bg-white/10 hover:bg-white/15 text-white border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Consult CMI AI
              </button>
              <button 
                onClick={() => setActiveTab("contests")}
                className="bg-[#C24134] hover:bg-[#A83227] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-amber-300" /> Fun Cooking Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Tab Contents */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: RECIPE MATCHER (CORE FEATURE) */}
          {activeTab === "matcher" && (
            <motion.div
              key="matcher"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              
              {/* Left Column: Interactive Pantry Cabinet */}
              <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-md shadow-stone-100/30 flex flex-col gap-5">
                
                <div className="flex items-center justify-between border-b border-stone-100 pb-3.5">
                  <div>
                    <h2 className="text-base font-display font-bold text-stone-900 flex items-center gap-2">
                      <Flame className="w-4.5 h-4.5 text-[#C24134]" />
                      Digital Pantry
                    </h2>
                    <p className="text-xs text-stone-500">Pick any ingredients you currently have</p>
                  </div>
                  {selectedIngredients.length > 0 && (
                    <button
                      onClick={clearSelectedIngredients}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Clear ({selectedIngredients.length})
                    </button>
                  )}
                </div>

                {/* Categories & Toggleable Capsule Chips */}
                <div className="space-y-5 overflow-y-auto max-h-[480px] pr-1 scrollbar-thin">
                  {categories.map((cat) => {
                    // Filter ingredients matching category and search query
                    const filteredIngs = INGREDIENTS.filter(
                      (ing) => ing.category === cat && 
                      ing.name.toLowerCase().includes(ingredientSearch.toLowerCase())
                    );

                    if (filteredIngs.length === 0) return null;

                    return (
                      <div key={cat} className="space-y-2">
                        <h3 className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5 bg-stone-50/50 px-2.5 py-1 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          {cat}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {filteredIngs.map((ing) => {
                            const isSelected = selectedIngredients.includes(ing.id);
                            return (
                              <button
                                type="button"
                                key={ing.id}
                                onClick={() => toggleIngredient(ing.id)}
                                className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-2 cursor-pointer select-none active:scale-95 ${
                                  isSelected
                                    ? "bg-amber-100 border-amber-300 text-amber-950 font-bold shadow-xs"
                                    : "bg-stone-50/50 hover:bg-stone-50 border-stone-200 text-stone-600"
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full transition-transform ${isSelected ? "bg-[#C24134] scale-125" : "bg-stone-300"}`}></span>
                                <span>{ing.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Selected tray summary at bottom of picker */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/60 mt-auto">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <span className="text-xs font-bold text-stone-700">Pantry Basket</span>
                    <span className="text-[9px] font-mono bg-stone-200 text-stone-600 px-1.5 py-0.2 rounded-full font-bold">
                      {selectedIngredients.length} items
                    </span>
                  </div>
                  {selectedIngredients.length === 0 ? (
                    <p className="text-xs text-stone-400 italic">No ingredients clicked yet. Showing all available recipes!</p>
                  ) : (
                    <div className="flex flex-wrap gap-1 max-h-[110px] overflow-y-auto">
                      {selectedIngredients.map((id) => {
                        const ing = INGREDIENTS.find((i) => i.id === id);
                        return (
                          <span
                            key={id}
                            className="bg-amber-50 text-amber-900 text-[10px] font-bold pl-2.5 pr-1.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-200"
                          >
                            {ing?.name}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleIngredient(id);
                              }}
                              className="text-amber-700 hover:text-amber-950 p-0.5"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Recipe list or Active Recipe Card */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                
                {/* Active Cuisine Filters & Title */}
                <div className="flex flex-col gap-5 bg-white p-6 rounded-3xl border border-stone-200/80 shadow-md shadow-stone-100/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
                    <div>
                      <h2 className="text-lg font-display font-black text-stone-900 tracking-tight flex items-center gap-2">
                        <ChefHat className="w-5 h-5 text-[#C24134]" />
                        Cuisine Hub
                      </h2>
                      <p className="text-xs text-stone-500">Discover matching recipes from your digital cabinet</p>
                    </div>
                    
                    {/* Stats */}
                    <div className="text-xs bg-stone-50 border border-stone-200/60 px-3 py-1.5 rounded-xl font-mono text-stone-600">
                      Matches: <strong className="text-stone-950">{matchingRecipes.length}</strong> recipes
                    </div>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {/* Region Filters (Cuisine Hub) */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#C24134]" />
                        Filter by Cuisine Region
                      </label>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {[
                          { id: "All", label: "All Cuisines" },
                          { id: "Asian Cuisines", label: "Asian" },
                          { id: "Middle Eastern Cuisines", label: "Middle Eastern" },
                          { id: "Oceanian Cuisines", label: "Oceanian" },
                          { id: "European Cuisines", label: "European" },
                          { id: "American Cuisines", label: "American" },
                          { id: "African Cuisines", label: "African" }
                        ].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setActiveRegionFilter(f.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                              activeRegionFilter === f.id
                                ? "bg-[#C24134] text-white border-[#C24134] shadow-sm font-bold"
                                : "bg-stone-50 text-stone-600 border-stone-200/60 hover:bg-stone-100 hover:text-stone-900"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Course Filters */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                        <UtensilsCrossed className="w-3.5 h-3.5 text-amber-500" />
                        Filter by Course
                      </label>
                      <div className="flex flex-wrap gap-1.5 text-xs">
                        {[
                          { id: "All", label: "All Courses" },
                          { id: "Snacks", label: "Snacks" },
                          { id: "Appetizers", label: "Appetizers" },
                          { id: "Main Courses", label: "Main Courses" },
                          { id: "Condiments", label: "Condiments" },
                          { id: "Drinks", label: "Drinks" },
                          { id: "Desserts", label: "Desserts" }
                        ].map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setActiveCourseFilter(f.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                              activeCourseFilter === f.id
                                ? "bg-amber-500 text-white border-amber-500 shadow-sm font-bold"
                                : "bg-stone-50 text-stone-600 border-stone-200/60 hover:bg-stone-100 hover:text-stone-900"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-View: Active Recipe Details (Cooking Assistant Mode) */}
                {selectedRecipe ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-200"
                  >
                    
                    {/* Cover Header */}
                    <div className="bg-[#FAF9F5] p-6 border-b border-stone-200 relative">
                      <button
                        onClick={() => setSelectedRecipe(null)}
                        className="absolute top-5 right-5 bg-white hover:bg-stone-50 text-stone-500 p-2 rounded-xl border border-stone-200 transition-all cursor-pointer"
                        title="Close active recipe"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="bg-amber-100 text-amber-950 text-[10px] font-bold px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wide border border-amber-200/50">
                          {getRecipeCourse(selectedRecipe)}
                        </span>
                        <span className="bg-[#C24134]/10 text-[#C24134] text-[10px] font-bold px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wide border border-[#C24134]/20">
                          {getRecipeRegion(selectedRecipe)}
                        </span>
                        <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wide">
                          {selectedRecipe.cuisine}
                        </span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md font-mono uppercase tracking-wide ${
                          selectedRecipe.difficulty === "Easy" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          selectedRecipe.difficulty === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {selectedRecipe.difficulty}
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-black text-stone-900 leading-tight mb-2">
                        {selectedRecipe.name}
                      </h3>
                      
                      <div className="bg-white/80 p-3.5 rounded-xl border border-stone-200/60 mb-5 text-xs text-stone-600 leading-relaxed italic font-serif relative">
                        <span className="absolute left-2.5 top-1 text-2xl text-amber-300 pointer-events-none">“</span>
                        <p className="pl-5 pr-2">
                          {selectedRecipe.story}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-5 text-xs text-stone-600 border-t border-stone-200/60 pt-4.5">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#C24134]" />
                          <span>Prep: <strong>{selectedRecipe.prepTime} mins</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-amber-500" />
                          <span>Cook: <strong>{selectedRecipe.cookTime} mins</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-stone-400" />
                          <span>By: <strong>{selectedRecipe.author}</strong></span>
                        </div>
                        <button
                          onClick={(e) => toggleBookmark(selectedRecipe.id, e)}
                          className="flex items-center gap-1.5 text-stone-700 hover:text-[#C24134] ml-auto font-bold cursor-pointer transition-colors"
                        >
                          <Bookmark className={`w-4 h-4 transition-colors ${bookmarks.includes(selectedRecipe.id) ? "fill-[#C24134] text-[#C24134]" : "text-stone-400"}`} />
                          <span className="text-xs font-bold">{bookmarks.includes(selectedRecipe.id) ? "Saved!" : "Save Recipe"}</span>
                        </button>
                      </div>

                    </div>

                    {/* Deterministic Serving Size Rescaler Engine */}
                    <div className="bg-[#FAF9F5] p-5.5 border-b border-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-amber-50 rounded-xl text-amber-800 border border-amber-200/30">
                          <Scale className="w-5 h-5 text-[#C24134]" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-stone-800">Portion Scaling Engine</h4>
                          <p className="text-[11px] text-stone-500">Portion measurements rescale mathematically in real-time</p>
                        </div>
                      </div>
                      
                      {/* Interactive Slider */}
                      <div className="flex items-center gap-4 w-full md:w-auto">
                        <span className="text-xs text-stone-500 font-bold">Servings:</span>
                        <input
                          type="range"
                          min="1"
                          max="12"
                          value={servingCount}
                          onChange={(e) => setServingCount(Number(e.target.value))}
                          className="w-32 md:w-44 accent-[#C24134] cursor-pointer"
                        />
                        <span className="bg-[#C24134] text-white font-mono font-bold px-3.5 py-1.5 rounded-xl text-xs min-w-[42px] text-center shadow-md">
                          {servingCount}
                        </span>
                      </div>
                    </div>

                    {/* Content Columns: Interactive Companion Mode */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                      
                      {/* Left: Portioned Ingredients Checklist */}
                      <div className="md:col-span-5 space-y-3.5">
                        <div className="border-b border-stone-150 pb-2 flex items-center justify-between">
                          <h4 className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                            Ingredient Checklist
                          </h4>
                          <span className="text-[9px] font-mono text-stone-400">Tap to measure</span>
                        </div>
                        <div className="space-y-1.5 bg-stone-50/50 p-4 rounded-2xl border border-stone-200/60">
                          {selectedRecipe.ingredients.map((item, idx) => {
                            const scaledAmount = item.baseAmount * (servingCount / selectedRecipe.baseServings);
                            const formattedAmount = Number(scaledAmount.toFixed(2)).toString();
                            const isMeasured = checkedIngredients.includes(item.name);

                            return (
                              <div 
                                key={idx} 
                                onClick={() => setCheckedIngredients(prev => prev.includes(item.name) ? prev.filter(i => i !== item.name) : [...prev, item.name])}
                                className={`flex justify-between items-center text-xs py-2 px-2 rounded-xl transition-all cursor-pointer select-none ${
                                  isMeasured 
                                    ? "bg-stone-200/30 text-stone-400 line-through decoration-stone-300" 
                                    : "hover:bg-stone-100/50 text-stone-700"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center text-[8px] transition-colors ${
                                    isMeasured ? "bg-emerald-500 border-emerald-500 text-white" : "border-stone-300"
                                  }`}>
                                    {isMeasured && "✓"}
                                  </span>
                                  <span>{item.name}</span>
                                </div>
                                <span className={`font-mono font-bold ${isMeasured ? "text-stone-400" : "text-stone-900 bg-stone-100 px-2 py-0.5 rounded"}`}>
                                  {formattedAmount} {item.unit}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Direct Steps Checklist */}
                      <div className="md:col-span-7 space-y-3.5">
                        <div className="border-b border-stone-150 pb-2 flex items-center justify-between">
                          <h4 className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                            Cooking Companion Guide
                          </h4>
                          <span className="text-[9px] font-mono text-stone-400">Tap step to cross out</span>
                        </div>
                        <div className="space-y-3">
                          {selectedRecipe.steps.map((step, idx) => {
                            const isStepDone = checkedSteps.includes(idx);
                            return (
                              <div 
                                key={idx} 
                                onClick={() => setCheckedSteps(prev => prev.includes(idx) ? prev.filter(s => s !== idx) : [...prev, idx])}
                                className={`flex gap-3.5 p-3 rounded-2xl border transition-all cursor-pointer select-none ${
                                  isStepDone 
                                    ? "bg-stone-50 border-stone-200 text-stone-400 opacity-60 line-through decoration-stone-300" 
                                    : "bg-white border-stone-200 hover:border-amber-300/60 shadow-xs"
                                }`}
                              >
                                <div className="pt-0.5">
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-colors ${
                                    isStepDone ? "bg-emerald-500 border-emerald-500 text-white" : "bg-stone-100 border-stone-250 text-stone-600"
                                  }`}>
                                    {isStepDone ? "✓" : idx + 1}
                                  </span>
                                </div>
                                <p className="text-xs text-stone-700 leading-relaxed pt-0.5">
                                  {step}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>

                    {/* Footer actions */}
                    <div className="bg-stone-50 px-6 py-4.5 border-t border-stone-200/80 flex items-center justify-between">
                      <button
                        onClick={() => setSelectedRecipe(null)}
                        className="text-xs font-bold text-stone-500 hover:text-[#C24134] flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        ← Back to Cuisine Hub
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab("ai");
                          setAiChat(prev => [
                            ...prev,
                            { sender: "user", text: `I am interested in cooking ${selectedRecipe.name}! What can I use as substitution suggestions?` }
                          ]);
                          // Auto trigger query
                          setTimeout(() => {
                            setAiInput(`Substitution options for ${selectedRecipe.name}`);
                          }, 100);
                        }}
                        className="bg-amber-100 text-amber-950 px-4 py-2 rounded-xl text-xs font-bold hover:bg-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer border border-amber-200/50"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#C24134]" />
                        Ask CMI AI about this recipe
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  
                  // Standard Recipe Grid List
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {matchingRecipes.length === 0 ? (
                      <div className="col-span-2 bg-white p-12 text-center rounded-3xl border border-stone-200/80 shadow-md shadow-stone-100/30">
                        <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                        <h3 className="text-sm font-bold text-stone-800">No matching recipes found</h3>
                        <p className="text-xs text-stone-500 max-w-md mx-auto mt-2 leading-relaxed">
                          Try selecting other key ingredients (like Chicken, Ilish, Prawns, or Eggs) or search for recipes containing your selected pantry spices.
                        </p>
                        <button
                          onClick={clearSelectedIngredients}
                          className="mt-4 bg-[#C24134] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#A83227] transition-all cursor-pointer shadow-md"
                        >
                          Show All Recipes
                        </button>
                      </div>
                    ) : (
                      matchingRecipes.map((recipe, idx) => {
                        const allSelectedMatches = recipe.requiredIngredients.filter(ing => selectedIngredients.includes(ing));
                        const matchPercentage = Math.round((allSelectedMatches.length / recipe.requiredIngredients.length) * 100);

                        return (
                          <motion.div
                            key={`${recipe.id}-${idx}`}
                            whileHover={{ y: -3, transition: { duration: 0.1 } }}
                            onClick={() => {
                              setSelectedRecipe(recipe);
                              setServingCount(recipe.baseServings);
                            }}
                            className="bg-white rounded-3xl p-5 border border-stone-200/80 hover:border-amber-400/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-2 mb-3">
                                <div className="flex flex-wrap gap-1">
                                  <span className="bg-amber-50 text-amber-950 text-[9px] font-bold px-2 py-0.5 rounded-md font-mono uppercase tracking-wide border border-amber-200/30">
                                    {getRecipeCourse(recipe)}
                                  </span>
                                  <span className="bg-[#C24134]/10 text-[#C24134] text-[9px] font-bold px-2 py-0.5 rounded-md font-mono uppercase tracking-wide border border-[#C24134]/20">
                                    {getRecipeRegion(recipe)}
                                  </span>
                                </div>
                                {selectedIngredients.length > 0 && (
                                  <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1 whitespace-nowrap">
                                    <Check className="w-2.5 h-2.5" />
                                    {matchPercentage}% Match
                                  </span>
                                )}
                              </div>

                              <h3 className="text-sm font-display font-bold text-stone-900 leading-snug mb-1 group-hover:text-[#C24134] transition-colors">
                                {recipe.name}
                              </h3>
                              
                              <p className="text-[10px] text-stone-400 font-mono mb-2">
                                {recipe.cuisine}
                              </p>

                              <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed">
                                {recipe.story}
                              </p>
                            </div>

                            <div className="border-t border-stone-100 pt-3 mt-auto">
                              <div className="flex items-center justify-between text-stone-500 text-[10px] font-mono uppercase tracking-wide">
                                <div className="flex items-center gap-3">
                                  <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
                                  <span>🎯 {recipe.requiredIngredients.length} Items</span>
                                </div>
                                <button
                                  onClick={(e) => toggleBookmark(recipe.id, e)}
                                  className="text-stone-400 hover:text-[#C24134] p-1 transition-colors"
                                >
                                  <Bookmark className={`w-4 h-4 ${bookmarks.includes(recipe.id) ? "fill-[#C24134] text-[#C24134]" : ""}`} />
                                </button>
                              </div>
                            </div>

                          </motion.div>
                        );
                      })
                    )}
                  </div>
                )}

              </div>

            </motion.div>
          )}

          {/* TAB 2: CMI AI ASSISTANT */}
          {activeTab === "ai" && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-stone-150 overflow-hidden"
            >
              
              {/* AI Assistant Header */}
              <div className="bg-gradient-to-r from-amber-500 to-[#B33F32] p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-2.5 rounded-xl border border-white/20">
                    <Sparkles className="w-6 h-6 text-amber-200" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold">CMI AI Cooking Assistant</h2>
                    <p className="text-xs text-amber-100">Conversational help, ingredients, cooking hacks & substitution</p>
                  </div>
                </div>
                <div className="bg-[#1C1918]/20 px-3 py-1 rounded text-[10px] font-mono border border-white/10">
                  Powered by Gemini 3.5-Flash
                </div>
              </div>

              {/* Chat screen */}
              <div className="p-6 h-[400px] overflow-y-auto space-y-4 bg-stone-50/50 flex flex-col">
                {aiChat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                      msg.sender === "user"
                        ? "bg-[#B33F32] text-white self-end rounded-tr-none"
                        : "bg-white text-stone-800 self-start rounded-tl-none border border-stone-200 shadow-xs"
                    }`}
                  >
                    {msg.sender === "bot" ? (
                      // Display markdown-like structure simply
                      <div className="space-y-2 whitespace-pre-line">
                        {msg.text.split("\n").map((line, lidx) => {
                          if (line.startsWith("### ")) {
                            return <h4 key={lidx} className="font-bold text-amber-600 font-display text-sm mt-2">{line.replace("### ", "")}</h4>;
                          }
                          if (line.startsWith("* ")) {
                            return <li key={lidx} className="ml-4 list-disc">{line.replace("* ", "")}</li>;
                          }
                          return <p key={lidx}>{line}</p>;
                        })}
                      </div>
                    ) : (
                      <p>{msg.text}</p>
                    )}
                  </div>
                ))}
                
                {aiLoading && (
                  <div className="bg-white border border-stone-200 text-stone-500 self-start rounded-2xl rounded-tl-none p-4 max-w-[80%] flex items-center gap-2 text-xs font-mono shadow-xs">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                    CMI AI is analyzing recipe records...
                  </div>
                )}
              </div>

              {/* Suggestions quick chips */}
              <div className="px-6 py-2 bg-stone-50 border-t border-b border-stone-200/60 flex flex-wrap gap-1.5 items-center">
                <span className="text-[10px] uppercase font-mono text-stone-400 mr-2">Quick Prompts:</span>
                {[
                  "Replace sour yogurt in beef curry",
                  "Panch Phoron spice ratio",
                  "Ilish fish perfect fry hack",
                  "Substitutes for mustard oil"
                ].map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setAiInput(chip)}
                    className="text-xs bg-white hover:bg-amber-50 text-stone-600 hover:text-amber-800 px-3 py-1 rounded-full border border-stone-200 transition-colors cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat input */}
              <form onSubmit={sendAiMessage} className="p-4 bg-white flex gap-3">
                <input
                  type="text"
                  placeholder="Ask CMI AI about traditional ingredients, portions, cooking steps..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="flex-1 bg-stone-50 text-stone-800 text-sm px-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={aiLoading || !aiInput.trim()}
                  className="bg-stone-900 text-amber-400 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 px-5 py-3 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Ask Assistant
                </button>
              </form>

            </motion.div>
          )}

          {/* TAB 3: KITCHEN TIPS */}
          {activeTab === "tips" && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl font-display font-bold text-stone-900">Deshi Tips & Hacks</h2>
                <p className="text-sm text-stone-500">Expert storage instructions, traditional spice prep and food saving secrets.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TIPS.map((tip, idx) => (
                  <motion.div
                    key={`${tip.id}-${idx}`}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl p-6 shadow-xs border border-stone-200/80 hover:border-amber-400/60 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <span className="bg-amber-100 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                        {tip.category}
                      </span>
                      <h3 className="text-base font-display font-bold text-stone-950">{tip.title}</h3>
                      <p className="text-xs text-stone-500 leading-relaxed">{tip.description}</p>
                    </div>
                    <button
                      onClick={() => setActiveTipModal(tip)}
                      className="mt-4 text-xs font-semibold text-amber-700 hover:text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Read full instruction <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Informational SEO statement */}
              <div className="bg-stone-100 p-4 rounded-xl border text-xs text-stone-500 text-center max-w-lg mx-auto">
                💡 **SEO Content Strategy Note**: In Phase 2, this section serves as a massive long-tail keyword pillar, driving organic search traffic for queries like "how to store green chilies" or "stop bitter mustard paste."
              </div>

            </motion.div>
          )}

          {/* TAB 4: DECIDER TOOL */}
          {activeTab === "decider" && (
            <motion.div
              key="decider"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-stone-150 text-center space-y-6"
            >
              
              <div className="space-y-2">
                <span className="bg-rose-100 text-[#B33F32] text-[10px] font-bold px-2.5 py-1 rounded-full font-mono uppercase tracking-wider">
                  Decision Helper
                </span>
                <h2 className="text-2xl font-display font-black text-stone-900">What should you cook today?</h2>
                <p className="text-sm text-stone-500">Let the culinary index choose a tasty dish at random</p>
              </div>

              <div className="bg-stone-50 p-8 rounded-2xl border border-stone-200 flex flex-col items-center justify-center min-h-[200px]">
                {deciderResult ? (
                  <motion.div
                    key={deciderResult.id}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="space-y-3"
                  >
                    <span className="text-[10px] font-mono text-stone-400 bg-stone-200 px-2 py-0.5 rounded">
                      {deciderResult.cuisine}
                    </span>
                    <h3 className="text-xl font-display font-extrabold text-stone-950">
                      {deciderResult.name}
                    </h3>
                    <p className="text-xs text-stone-500 italic max-w-xs mx-auto">
                      "{deciderResult.story}"
                    </p>
                    <button
                      onClick={() => {
                        setSelectedRecipe(deciderResult);
                        setServingCount(deciderResult.baseServings);
                        setActiveTab("matcher");
                      }}
                      className="mt-2 text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-4 py-1.5 rounded-lg font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" /> View Recipe Details
                    </button>
                  </motion.div>
                ) : (
                  <div className="text-stone-400 text-sm italic">
                    {isSpinning ? "Selecting ingredients..." : "Click Smash below to decide!"}
                  </div>
                )}
              </div>

              <button
                onClick={runDecider}
                disabled={isSpinning}
                className="w-full bg-[#B33F32] hover:bg-[#c9483a] disabled:bg-stone-200 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSpinning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Smashing Culinary Wheel...
                  </>
                ) : (
                  <>
                    <Sliders className="w-5 h-5 text-amber-300" /> Smash to Choose What to Cook!
                  </>
                )}
              </button>

            </motion.div>
          )}

          {/* TAB 5: CONTESTS */}
          {activeTab === "contests" && (
            <motion.div
              key="contests"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl font-display font-bold text-stone-900">Traditional Cooking Contests</h2>
                <p className="text-sm text-stone-500">Submit your recipes, get voted by the community, and win premium gift vouchers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONTESTS.map((contest) => (
                  <div key={contest.id} className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between">
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          contest.status === "Active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}>
                          ● {contest.status}
                        </span>
                        <span className="text-xs text-stone-500 font-mono">
                          {contest.entriesCount} entries submitted
                        </span>
                      </div>

                      <h3 className="text-lg font-display font-extrabold text-stone-950">{contest.title}</h3>
                      <p className="text-xs text-stone-600 leading-relaxed">{contest.description}</p>

                      <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-150 flex items-center justify-between text-xs">
                        <div>
                          <p className="text-stone-400 font-mono text-[9px] uppercase tracking-wider">PRIZE POOL</p>
                          <p className="font-bold text-amber-800">{contest.prize}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-stone-400 font-mono text-[9px] uppercase tracking-wider">DEADLINE</p>
                          <p className="font-bold text-stone-700">{contest.deadline}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-stone-50 px-6 py-4 border-t border-stone-150">
                      <button
                        onClick={() => {
                          if (!userProfile) {
                            setAuthMode("register");
                            setShowAuthModal(true);
                          } else {
                            setShowContestModal(contest);
                          }
                        }}
                        className="w-full bg-stone-950 text-amber-400 hover:bg-stone-800 py-2 rounded-xl text-xs font-semibold text-center block transition-all cursor-pointer"
                      >
                        {userProfile ? "Submit Entry Draft" : "Register to Submit Entry"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          )}

          {/* TAB 6: SUBMIT RECIPE */}
          {activeTab === "submit" && (
            <motion.div
              key="submit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-stone-150 overflow-hidden"
            >
              
              <div className="bg-[#262220] p-6 text-[#F1EAE0] flex items-center justify-between border-b border-rose-950/20">
                <div className="flex items-center gap-3">
                  <div className="bg-[#B33F32] p-2 rounded-xl text-[#F6EEDF]">
                    <PlusCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-display font-bold">Submit a Traditional Recipe</h2>
                    <p className="text-xs text-stone-400">Share your culinary skills with our global cooking community</p>
                  </div>
                </div>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Rules guidelines panel */}
                <div className="md:col-span-5 bg-amber-50/50 p-5 rounded-xl border border-amber-100 space-y-4">
                  <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">Submission Guidelines</h3>
                  
                  <ul className="space-y-3 text-xs text-stone-700">
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>**Original Content Only**: Submit your own kitchen descriptions. Fraudulent/stolen recipes are subject to removal.</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>**Attribution Rule**: If adapted from a family recipe or book, mention it in the backstory field.</span>
                    </li>
                    <li className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>**Ingredient Tagging**: Select the matching ingredient tags so users can discover your dish in our dynamic picker!</span>
                    </li>
                  </ul>

                  <div className="bg-amber-100/90 p-4 rounded-xl border border-amber-300 text-xs text-amber-950 space-y-1.5 shadow-sm">
                    <p className="font-bold flex items-center gap-1.5 text-amber-900">
                      ✨ Earn Credit For Your Recipe!
                    </p>
                    <p className="leading-relaxed">
                      If we select your recipes, they will be **highlighted on our homepage and website**, and you will receive a **one-time revenue** depending on the recipe's demand!
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded border border-amber-200 text-[11px] text-amber-800">
                    🔒 **Copyright Policy Notice**: Raw ingredient lists and basic directions are legally non-copyrightable, but photos or creative descriptions must belong solely to you.
                  </div>
                </div>

                {/* Form panel */}
                <form onSubmit={handleRecipeSubmit} className="md:col-span-7 space-y-4">
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-600 uppercase">Recipe Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Shajahan's Mustard Chicken Curry"
                      value={newRecipeForm.name}
                      onChange={(e) => setNewRecipeForm({...newRecipeForm, name: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600 uppercase">Cuisine Type</label>
                      <input
                        type="text"
                        placeholder="e.g., Bengali Comfort"
                        value={newRecipeForm.cuisine}
                        onChange={(e) => setNewRecipeForm({...newRecipeForm, cuisine: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-stone-600 uppercase">Category</label>
                      <select
                        value={newRecipeForm.category}
                        onChange={(e) => setNewRecipeForm({...newRecipeForm, category: e.target.value as any})}
                        className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                      >
                        <option value="Snacks">Snacks</option>
                        <option value="Appetizers">Appetizers</option>
                        <option value="Main Courses">Main Courses</option>
                        <option value="Condiments">Condiments</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Desserts">Desserts</option>
                      </select>
                    </div>
                  </div>

                  {/* Core Ingredient mapping */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-600 uppercase block">Map Pantry Tag IDs * (Select at least 1)</label>
                    <div className="flex flex-wrap gap-1.5 max-h-[120px] overflow-y-auto border border-stone-200 p-2.5 rounded-lg bg-stone-50">
                      {INGREDIENTS.map((ing) => {
                        const isMapped = newRecipeForm.requiredIngredients.includes(ing.id);
                        return (
                          <button
                            type="button"
                            key={ing.id}
                            onClick={() => {
                              if (isMapped) {
                                setNewRecipeForm({
                                  ...newRecipeForm,
                                  requiredIngredients: newRecipeForm.requiredIngredients.filter(id => id !== ing.id)
                                });
                              } else {
                                setNewRecipeForm({
                                  ...newRecipeForm,
                                  requiredIngredients: [...newRecipeForm.requiredIngredients, ing.id]
                                });
                              }
                            }}
                            className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer ${
                              isMapped
                                ? "bg-amber-100 border-amber-300 text-amber-900 font-bold"
                                : "bg-white border-stone-200 text-stone-600 hover:bg-stone-100"
                            }`}
                          >
                            {ing.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ingredients detailed text */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-600 uppercase">Quantities & Portions (One per line)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., 500 grams Chicken&#10;1 tbsp Ginger Paste&#10;2 tbsp Mustard Oil"
                      value={newRecipeForm.ingredientsText}
                      onChange={(e) => setNewRecipeForm({...newRecipeForm, ingredientsText: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Cooking Steps detailed text */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-600 uppercase">Directions Steps (One per line)</label>
                    <textarea
                      rows={3}
                      placeholder="e.g., Fry sliced onion until golden brown.&#10;Sauté ginger and garlic with dry masala paste."
                      value={newRecipeForm.stepsText}
                      onChange={(e) => setNewRecipeForm({...newRecipeForm, stepsText: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs font-mono focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>

                  {/* Story */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-600 uppercase">Family Story or Backstory</label>
                    <input
                      type="text"
                      placeholder="e.g., Passed down from my grandmother during traditional family gatherings..."
                      value={newRecipeForm.story}
                      onChange={(e) => setNewRecipeForm({...newRecipeForm, story: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#B33F32] hover:bg-[#c9483a] text-white font-bold py-3 rounded-lg text-sm transition-colors cursor-pointer"
                  >
                    Submit Draft to Community Index
                  </button>

                </form>

              </div>

            </motion.div>
          )}

          {/* TAB 7: BOOKMARKS */}
          {activeTab === "bookmarks" && (
            <motion.div
              key="bookmarks"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              
              <div className="text-center max-w-xl mx-auto space-y-2">
                <h2 className="text-2xl font-display font-bold text-stone-900">Your Bookmarked Recipes</h2>
                <p className="text-sm text-stone-500">Easily access your saved cooking procedures anytime.</p>
              </div>

              {!userProfile ? (
                <div className="bg-white p-12 text-center rounded-2xl shadow-xs border border-stone-150 max-w-md mx-auto flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#C24134]/10 text-[#C24134] rounded-full flex items-center justify-center mb-4">
                    <Bookmark className="w-8 h-8 fill-current" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 font-display">Your saved recipes</h3>
                  <p className="text-xs text-stone-500 mt-2 max-w-sm leading-relaxed">
                    Log in to save recipes and see them here. Bookmarks sync across every device you sign in on.
                  </p>
                  <div className="flex items-center gap-3 mt-6 w-full">
                    <button
                      onClick={() => { setAuthMode("login"); setShowAuthModal(true); }}
                      className="flex-1 bg-[#C24134] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-[#A83227] transition-all cursor-pointer shadow-md"
                    >
                      Log in
                    </button>
                    <button
                      onClick={() => { setAuthMode("register"); setShowAuthModal(true); }}
                      className="flex-1 bg-white text-stone-700 border border-stone-300 py-2.5 rounded-xl text-xs font-bold hover:bg-stone-50 transition-all cursor-pointer"
                    >
                      Create an account
                    </button>
                  </div>
                </div>
              ) : bookmarks.length === 0 ? (
                <div className="bg-white p-12 text-center rounded-2xl shadow-xs border border-stone-150 max-w-md mx-auto">
                  <Bookmark className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                  <h3 className="text-base font-bold text-stone-800 font-display">No saved recipes</h3>
                  <p className="text-xs text-stone-500 mt-2">
                    Browse the matching recipe feed and click the bookmark icon on any dish card to keep it saved locally.
                  </p>
                  <button
                    onClick={() => setActiveTab("matcher")}
                    className="mt-4 bg-[#B33F32] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#c9483a] transition-all cursor-pointer"
                  >
                    Explore Matcher Feed
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...RECIPES, ...customRecipes]
                    .filter((r) => bookmarks.includes(r.id))
                    .map((recipe, idx) => (
                      <div
                        key={`${recipe.id}-${idx}`}
                        onClick={() => {
                          setSelectedRecipe(recipe);
                          setServingCount(recipe.baseServings);
                          setActiveTab("matcher");
                        }}
                        className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-xs hover:border-amber-400 transition-all cursor-pointer flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            <span className="bg-amber-50 text-amber-950 text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                              {getRecipeCourse(recipe)}
                            </span>
                            <span className="bg-[#C24134]/10 text-[#C24134] text-[10px] font-bold px-2 py-0.5 rounded-full font-mono uppercase">
                              {getRecipeRegion(recipe)}
                            </span>
                          </div>
                          <h3 className="text-base font-display font-bold text-stone-950 mt-1">{recipe.name}</h3>
                          <p className="text-xs text-stone-500 mt-1">{recipe.cuisine}</p>
                        </div>
                        <div className="border-t border-stone-100 pt-3 mt-4 flex items-center justify-between text-[11px] text-stone-500">
                          <span>⏱️ {recipe.prepTime + recipe.cookTime} mins</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setBookmarks(bookmarks.filter(b => b !== recipe.id));
                            }}
                            className="text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

            </motion.div>
          )}

          {/* TAB 8: LEGAL, TRUST & ABOUT */}
          {activeTab === "policy" && (
            <motion.div
              key="policy"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
              
              {/* Left sidebar navigation inside legal tab */}
              <div className="md:col-span-4 bg-white p-5 rounded-2xl border border-stone-150 h-fit space-y-4">
                <h3 className="text-sm font-display font-bold text-stone-900 border-b pb-2">Trust Hub Contents</h3>
                <div className="flex flex-col gap-1 text-xs">
                  <a href="#about-us" className="p-2 hover:bg-stone-50 rounded-lg text-stone-700 font-medium">🏢 About Our Mission</a>
                  <a href="#contact-us" className="p-2 hover:bg-stone-50 rounded-lg text-stone-700 font-medium">📞 Contact CMI Team</a>
                  <a href="#privacy-policy" className="p-2 hover:bg-stone-50 rounded-lg text-[#B33F32] font-semibold">🔒 Privacy & Google AdSense Policy</a>
                  <a href="#terms-of-service" className="p-2 hover:bg-stone-50 rounded-lg text-[#B33F32] font-semibold">📝 Terms of Service</a>
                  <a href="#copyright" className="p-2 hover:bg-stone-50 rounded-lg text-stone-700 font-medium">⚖️ DMCA & Copyright Policy</a>
                </div>
              </div>

              {/* Right panel detailed content */}
              <div className="md:col-span-8 bg-white p-6 rounded-2xl border border-stone-150 space-y-8 max-h-[700px] overflow-y-auto">
                
                {/* About Us */}
                <section id="about-us" className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-stone-900 border-b pb-1.5 flex items-center gap-2">
                    🏢 About Cook My Ingredients
                  </h3>
                  <p className="text-sm text-stone-700 leading-relaxed">
                    Launched in July 2026 as a flagship solution for traditional and global households, Cook My Ingredients (CMI) is a modern, fast, and completely offline-friendly recipe finder. Our core objective is simple: help home cooks reduce daily food waste, save budget, and find authentic South Asian and global culinary ideas using ingredients they already own.
                  </p>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Our platform integrates robust deterministic scaling engines, structured recipe models, and server-side artificial intelligence (powered by Google Gemini) to act as a complete kitchen dashboard.
                  </p>
                </section>

                {/* Contact Us */}
                <section id="contact-us" className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-stone-900 border-b pb-1.5 flex items-center gap-2">
                    📞 Contact CMI Team
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                      <p className="font-bold text-stone-900">Email Enquiries</p>
                      <p className="text-stone-600 mt-1 font-mono">support@cookmyingredients.com</p>
                      <p className="text-stone-400 mt-1">General inquiries, AdSense partnerships, DMCA notices.</p>
                    </div>
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
                      <p className="font-bold text-stone-900">Office Location</p>
                      <p className="text-stone-600 mt-1">Dhaka, Bangladesh</p>
                      <p className="text-stone-400 mt-1">Proudly supporting Bangladesh & South Asian diaspora worldwide.</p>
                    </div>
                  </div>
                </section>

                {/* Privacy Policy */}
                <section id="privacy-policy" className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-stone-900 border-b pb-1.5 flex items-center gap-2 text-[#B33F32]">
                    🔒 Privacy Policy & Google AdSense Eligibility
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    This Policy outlines our strict adherence to user privacy and data security. By accessing CMI and connecting third-party platforms, you consent to the handling of data detailed below.
                  </p>
                  <div className="bg-stone-50 p-4 rounded-xl text-xs space-y-2 border border-stone-150">
                    <p><strong>1. Google AdSense Cookie Disclosure:</strong> We utilize Google AdSense (Phase 2 integration) and third-party analytics cookies to measure traffic. Cookies track generic demographic information anonymously. You can revoke consent at any time using your browser settings.</p>
                    <p><strong>2. Third-Party AI Integrations (Google Gemini API):</strong> Our CMI AI assistant relies on server-side queries to Google's Gemini models. Your chat inputs are processed securely and anonymously. In compliance with the Gemini Free Tier terms, please do not share personally identifiable information (full name, password, health credentials) within the culinary chat prompt.</p>
                    <p><strong>3. OAuth & SMS Signup:</strong> User authentication is managed securely via our verified backend. We store only essential contact elements (e.g. name, verified email or phone) and never share this data with third parties.</p>
                  </div>
                </section>

                {/* Terms of Service */}
                <section id="terms-of-service" className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-stone-900 border-b pb-1.5 flex items-center gap-2 text-[#B33F32]">
                    📝 Terms of Service (ToS)
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Users must be at least **13 years of age** to register an account on Cook My Ingredients. All submissions to our community database must represent clean recipes without offensive descriptions. We reserve the absolute right to remove user-submitted entries that violate intellectual rights or contain fraudulent descriptions.
                  </p>
                </section>

                {/* Copyright Policy */}
                <section id="copyright" className="space-y-3">
                  <h3 className="text-lg font-display font-bold text-stone-900 border-b pb-1.5 flex items-center gap-2">
                    ⚖️ Copyright & DMCA Takedown Process
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Under standard international law, **raw lists of ingredients and basic culinary cooking steps are not copyrightable**. However, custom food photography and unique descriptive text are protected.
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    If you believe any user-submitted recipe on CMI infringes your copyright, please send a formal DMCA Notice of Takedown to <span className="font-mono text-[#B33F32]">dmca@cookmyingredients.com</span> containing the URL of the recipe, your contact information, and physical/electronic proof of original authorship.
                  </p>
                </section>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer Branding */}
      <footer className="bg-stone-900 text-stone-400 py-8 border-t border-stone-800 mt-12 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap justify-center gap-6 text-stone-300 font-semibold mb-2">
            <button onClick={() => setActiveTab("matcher")} className="hover:text-amber-400 cursor-pointer">Explore Recipe Matcher</button>
            <button onClick={() => setActiveTab("ai")} className="hover:text-amber-400 cursor-pointer">CMI AI Assistant</button>
            <button onClick={() => setActiveTab("tips")} className="hover:text-amber-400 cursor-pointer">Kitchen Hacks</button>
            <button onClick={() => setActiveTab("policy")} className="hover:text-amber-400 cursor-pointer">DMCA & Terms</button>
          </div>
          <p className="max-w-lg mx-auto text-[11px] text-stone-500">
            Cook My Ingredients © 2026. Designed with 3D modern aesthetics. Supporting home cooks and minimizing food waste across the globe.
          </p>
        </div>
      </footer>

      {/* MODAL 1: AUTHENTICATION MODAL (LOGIN/REGISTER) */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-250"
          >
            {/* Modal Header */}
            <div className="bg-[#262220] p-4 text-[#F1EAE0] flex items-center justify-between">
              <h3 className="font-display font-bold">
                {authMode === "login" ? "Login to CMI" : "Create CMI Account"}
              </h3>
              <button 
                onClick={() => { setShowAuthModal(false); setSmsSent(false); }}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              
              {/* Social Login buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={(e) => {
                    setUserProfile({ name: "Google Guest", email: "guest@gmail.com" });
                    setShowAuthModal(false);
                  }}
                  className="w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Globe className="w-4 h-4 text-blue-500" />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setUserProfile({ name: "Microsoft Guest", email: "guest@outlook.com" });
                    setShowAuthModal(false);
                  }}
                  className="w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Globe className="w-4 h-4 text-green-500" />
                  Continue with Microsoft (Outlook)
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    setUserProfile({ name: "Facebook Guest", email: "guest@facebook.com" });
                    setShowAuthModal(false);
                  }}
                  className="w-full bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Globe className="w-4 h-4 text-blue-700" />
                  Continue with Facebook
                </button>
              </div>

              <div className="relative text-center my-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t"></span></div>
                <span className="relative bg-white px-2 text-[10px] text-stone-400 uppercase font-mono">Or Use Credentials</span>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                
                {authMode === "register" && (
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-stone-500 uppercase">Your Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g., Adhikary Alex"
                        value={authForm.name}
                        onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                        className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    <input
                      type="email"
                      placeholder="email@example.com"
                      value={authForm.email}
                      onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={authForm.password}
                      onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                      className="w-full bg-stone-50 border border-stone-200 pl-10 pr-4 py-2 text-sm rounded-lg focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Country-code Phone Signup Simulation */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-stone-500 uppercase block">Phone OTP Signup (Simulated)</label>
                  <div className="flex gap-2">
                    <select
                      value={authForm.countryCode}
                      onChange={(e) => setAuthForm({...authForm, countryCode: e.target.value})}
                      className="bg-stone-50 border border-stone-200 rounded-lg text-xs p-2 focus:outline-none focus:border-amber-500"
                    >
                      <option value="+880">+880 (BD)</option>
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (IN)</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="1712345678"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                      className="flex-1 bg-stone-50 border border-stone-200 rounded-lg p-2 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                {authForm.phone && !smsSent && (
                  <button
                    type="button"
                    onClick={() => { setSmsSent(true); alert("Simulated SMS OTP sent to " + authForm.countryCode + " " + authForm.phone + "! Enter any digits to verify."); }}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold py-1.5 rounded-lg border cursor-pointer"
                  >
                    Request OTP Verification SMS
                  </button>
                )}

                {smsSent && (
                  <div className="space-y-1 bg-amber-50 p-3 rounded-lg border border-amber-200">
                    <label className="text-[10px] font-bold text-amber-900 uppercase">Enter SMS Verification Code</label>
                    <input
                      type="text"
                      placeholder="e.g., 4821"
                      value={authForm.otp}
                      onChange={(e) => setAuthForm({...authForm, otp: e.target.value})}
                      className="w-full border rounded p-1.5 text-center text-sm font-mono font-bold focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#B33F32] hover:bg-[#c9483a] text-white py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-md mt-2"
                >
                  {authMode === "login" ? "Confirm Login" : "Complete Registration"}
                </button>

                <div className="text-center text-xs mt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}
                    className="text-amber-800 hover:underline"
                  >
                    {authMode === "login" ? "Don't have an account? Register" : "Already registered? Login instead"}
                  </button>
                </div>

              </form>

            </div>

          </motion.div>
        </div>
      )}

      {/* MODAL 2: TIP EXPANSION DETAILS MODAL */}
      {activeTipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-250"
          >
            <div className="bg-stone-900 p-4 text-white flex items-center justify-between">
              <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                {activeTipModal.category}
              </span>
              <button 
                onClick={() => setActiveTipModal(null)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-display font-black text-stone-950">{activeTipModal.title}</h3>
              <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-line bg-stone-50 p-4 rounded-xl border border-stone-200">
                {activeTipModal.fullContent}
              </div>
            </div>
            <div className="bg-stone-50 p-4 border-t text-center">
              <button
                onClick={() => setActiveTipModal(null)}
                className="bg-stone-950 text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
              >
                Got it, thank you!
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL 3: CONTEST ENTRY SIMULATOR MODAL */}
      {showContestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-stone-250"
          >
            <div className="bg-[#262220] p-4 text-[#F1EAE0] flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-sm">Contest Submission:</h3>
                <p className="text-[10px] text-amber-400 font-mono">{showContestModal.title}</p>
              </div>
              <button 
                onClick={() => setShowContestModal(null)}
                className="text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleContestEntry} className="p-6 space-y-4">
              
              {contestSuccessMessage && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-lg text-xs font-semibold flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {contestSuccessMessage}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase">Recipe / Combos Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Smoked Jackfruit and Lentil Rice Combo"
                  value={contestEntryForm.recipeName}
                  onChange={(e) => setContestEntryForm({...contestEntryForm, recipeName: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-sm focus:outline-none focus:border-amber-500 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-500 uppercase">Backstory & Preparation Details</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us the story of how your recipe pairing binds your family together..."
                  value={contestEntryForm.story}
                  onChange={(e) => setContestEntryForm({...contestEntryForm, story: e.target.value})}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-stone-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  required
                  checked={contestEntryForm.agreeToTerms}
                  onChange={(e) => setContestEntryForm({...contestEntryForm, agreeToTerms: e.target.checked})}
                  className="accent-amber-500 rounded h-4 w-4 mt-0.5"
                />
                <span>I verify that this photo and description is original and conforms to the CMI Copyright Policies.</span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#B33F32] hover:bg-[#c9483a] text-white py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                Submit Entry Draft
              </button>

            </form>

          </motion.div>
        </div>
      )}

    </div>
  );
}
