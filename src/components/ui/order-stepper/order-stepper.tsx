import { Car } from "lucide-react";
import Stepper from "react-stepper-horizontal";
const OrderStepper = () => {
	return (
		<div className="w-full -mt-9 h-5 flex flex-row gap-1 justify-center">
			<Stepper
				steps={[
					{ title: "Step One", icon: <Car></Car> },
					{ title: "Step Two" },
					{ title: "Step Three" },
					{ title: "Step Four" },
				]}
				activeStep={1}
			/>
		</div>
	);
};

export default OrderStepper;
