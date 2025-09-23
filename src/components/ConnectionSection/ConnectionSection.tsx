type ConnectionSectionProps = {
    message: string;
    state: "Loading" | "Failed";
};

export function ConnectionSection({ message, state }: ConnectionSectionProps) {
    return (<>
         <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-purple-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center overflow-auto">
            <h1 className="text-6xl sm:text-7xl font-extrabold text-purple-700 dark:text-purple-300 mb-10 drop-shadow-lg">
                FRACTURE
            </h1>
            <div className="p-6 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/50 text-center max-w-[13rem] w-full">
                <h2 className={`text-2xl font-semibold ${
                    state === 'Loading' ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-700 dark:text-red-400'
                }`}>
                    {message}
                </h2>
            </div>
        </div>
    </>
        
    );
}
