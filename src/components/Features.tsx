import Button from './Button';
import { features } from '../utils/Data';
const Features = () => {

    return (
        <section className=" w-full mt-20">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="h-[85vh] w-full flex flex-col md:flex-row items-center justify-center "
                >
                    <div className="w-full md:w-1/2 md:p-8 text-[var(--secondary-color)] ">
                        <h3 className="text-4xl font-semibold">{feature.title}</h3>
                        <p className="text-lg py-5">{feature.description}</p>
                        <Button size="small" variant="secondary">
                            Learn More
                        </Button>
                    </div>
                    <div className="w-full md:w-1/2 flex items-center justify-center order-first md:order-last mb-8 md:pb-0">
                        <div className={`w-full h-[300px] md:h-[400px] rounded-2xl flex items-center justify-center text-2xl font-bold ${feature.bgColor}`}>
                            Image Placeholder
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
};

export default Features;
 