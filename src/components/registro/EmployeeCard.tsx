interface Employee {
  id: string;
  employee_id: string;
  name: string;
  department: string;
}

interface EmployeeCardProps {
  employee: Employee;
  index: number;
  onClick: () => void;
}

const gradients = [
  "bg-card-blue",
  "bg-card-green",
  "bg-card-purple",
  "bg-card-pink",
  "bg-card-yellow",
];

export const EmployeeCard = ({ employee, index, onClick }: EmployeeCardProps) => {
  const gradient = gradients[index % gradients.length];

  return (
    <button
      onClick={onClick}
      className={`${gradient} p-6 rounded-2xl text-white text-left w-full 
        transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
        border-2 border-white/30 hover:border-white/60 backdrop-blur-sm
        animate-scale-in cursor-pointer`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{employee.name}</h3>
        <div className="flex flex-col gap-1 text-white/90">
          <span className="text-sm">Matrícula: {employee.employee_id}</span>
          <span className="text-sm">{employee.department}</span>
        </div>
      </div>
    </button>
  );
};