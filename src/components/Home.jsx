import React from 'react';
import { Shield, AlertTriangle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1d1f35]">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Sistema de Revisión Sísmica</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Plataforma especializada para el análisis y gestión de eventos sísmicos. 
            Monitoreo en tiempo real y respuesta inmediata.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="pt-6 h-full">
              <div className="flow-root bg-gray-800/50 border border-gray-700 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white tracking-tight">Monitoreo en Tiempo Real</h3>
                  <p className="mt-5 text-base text-gray-400">
                    Sistema de detección y análisis inmediato de eventos sísmicos para una respuesta rápida y efectiva.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="pt-6 h-full">
              <div className="flow-root bg-gray-800/50 border border-gray-700 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white tracking-tight">Análisis Especializado</h3>
                  <p className="mt-5 text-base text-gray-400">
                    Revisión experta de eventos sísmicos con herramientas avanzadas de análisis y evaluación.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="pt-6 h-full">
              <div className="flow-root bg-gray-800/50 border border-gray-700 rounded-lg px-6 pb-8 h-full">
                <div className="-mt-6">
                  <div>
                    <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                      <Users className="h-6 w-6 text-white" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-lg font-medium text-white tracking-tight">Colaboración en Equipo</h3>
                  <p className="mt-5 text-base text-gray-400">
                    Sistema integrado para la coordinación entre expertos y equipos de respuesta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex justify-center">
          <div className="w-full max-w-md">
            <button
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 transition-colors duration-200"
              onClick={() => navigate('/servicios')}
            >
              Comenzar Análisis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 