import { motion } from 'framer-motion';

interface Machine {
  id: number;
  name: string;
  status: string; // "online" | "offline"
  cpuUsage?: number;
}

interface HomeMachinesProps {
  machines: Machine[];
}

export const HomeMachines: React.FC<HomeMachinesProps> = ({ machines }) => {
  if (machines.length === 0) return null;

  return (
    <motion.section 
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-foreground mb-6">Tus Máquinas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {machines.map(machine => (
          <div key={machine.id} className="border border-gray-200 p-4 rounded-md hover:shadow-sm transition">
            <h4 className="text-lg font-semibold text-foreground mb-2">{machine.name}</h4>
            <p className="text-sm text-gray-600 mb-1">Estado: {machine.status}</p>
            {machine.cpuUsage !== undefined && (
              <p className="text-sm text-gray-600 mb-1">CPU: {machine.cpuUsage}%</p>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
};

